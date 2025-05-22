import { NextFunction, Request, Response } from "express";
import { prismaClient, decimal } from '@repo/prisma/prisma'
import connectRedis, {redisClient} from "@repo/redis-client/redis";
import { Decimal } from "../../../../packages/prisma/generated/prisma/runtime/library";
interface IOrder{
     eventId: string, 
     price:number,
     type:string,
     side:string, 
     qty:number
}


export const orderController = async(req: Request<{},{},IOrder>, res: Response, next: NextFunction) => {
    
    const redis =  redisClient();
    const {eventId, price, type, side, qty} = req.body;

    redis.lpush('orderQueue', JSON.stringify({
        eventId,
        price,
        type,
        side,
      qty,
    })
  );
  

  res.send("yeaf");
};

export const getCurrentOrderBook = async (
  req: Request<{eventId:string}, {}, IOrder>,
  res: Response,
  next: NextFunction
) => {

  const {eventId} = req.params;
  const sellOrder = await prismaClient.orders.groupBy({
    by:['type', 'price', 'status', 'side', 'eventId'],
    where:{
        status:"pending",
        type:'sell',
        eventId
    },
    _sum: {
        leftQty : true
    },
    orderBy:{
        price:'asc'
    }
  });
 
  let orderYes = sellOrder.filter(i => i.side === 'yes')
                          .map((i) => {
    return{
        price:i.price,
        quantity: i._sum.leftQty
    }
  })
  let orderNo = sellOrder.filter(i => i.side === 'no')
                          .map((i) => {
    return{
        price:i.price,
        quantity: i._sum.leftQty
    }
  })

  let currentLengthYes = orderYes.length
  let currentLengthNo = orderNo.length
  
  if(currentLengthYes < 5){
      while(currentLengthYes < 5){
          const lastPrice = orderYes[currentLengthYes - 1]?.price ?? 0
          orderYes.push({price: decimal(lastPrice).plus(0.5), quantity:0})
          currentLengthYes +=1;
    }
  }
  if(currentLengthNo < 5){
      while(currentLengthNo < 5){
          const lastPrice = orderNo[currentLengthNo - 1]?.price ?? 0
          orderNo.push({price: decimal(lastPrice).plus(0.5), quantity:0})
          currentLengthNo +=1;
    }
  }
  console.log(orderNo, orderYes)
  res.status(200).json({
    eventId:eventId,
    orderbook:{
        yes:orderYes.splice(0,5),
        no:orderNo.splice(0,5)
    }
  })
};


export const  getEventChart = async(req: Request<{eventId:string}>, res: Response ,next: NextFunction) => {
    const {eventId} = req.params
    const {duration} = req.query

    if(!eventId)throw new Error('Event Id Not provided')
        
    const event = await prismaClient.events.findUnique({where:{id:eventId}})

    if(!event) throw new Error('No events')

        
        let from = Number(duration) === 0 ? new Date(event.startTime).getTime() :  Date.now() - (Number(duration) * 60 * 1000 )
        
        
        const orders = await prismaClient.orders.findMany({where: {eventId: eventId, type:'buy', createdAt:{gte:new Date(from)}},orderBy:{createdAt:"asc"}})
        
        const timeSlots = 16;
        
        
        const timeSlotDuratoinMs = Math.floor((Date.now()- from)/ timeSlots);
        
        const {probYes, probNo} = await getPrevOrders(eventId, from)

        let totalYesBefore = probYes
        let totalNoBefore = probNo

        const bucket: Record<number, {yes:number, no:number, totalYes: number, totalNo: number}> = {}
    console.log(orders)
        for(const order of orders){
            const ts = new Date(order.createdAt).getTime()
            const index = Math.floor((ts - from)/ timeSlotDuratoinMs);
            if(order.side === 'yes'){
                bucket[index] = {yes : order.quantity + totalYesBefore, no: totalNoBefore, totalYes: bucket[index] ? bucket[index].totalYes + order.quantity : order.quantity, totalNo: bucket[index] ? bucket[index].totalNo : 0}
                totalYesBefore += order.quantity;
                
            }else if(order.side === 'no'){
                bucket[index] = {yes: totalYesBefore , no:  order.quantity + totalNoBefore, totalNo: bucket[index] ? bucket[index].totalNo + order.quantity : order.quantity, totalYes: bucket[index] ? bucket[index].totalYes : 0}
                totalNoBefore += order.quantity
            }
        }
        console.log(bucket)

        let exsistingYes = probYes;
        let exsistingNo = probNo;

        const probabilityStatus = Array.from({length: timeSlots}, (_, i) => {
            let yes ;
            let no;
            if(bucket[i]){
                yes = bucket[i].yes
                no = bucket[i].no
                exsistingYes = bucket[i].yes
                exsistingNo = bucket[i].no
            }else {
                    yes = exsistingYes
                    no = exsistingNo
                }
            

            const total = yes + no;
            const rawProbYes = total > 0 ? (yes / total) * 10 : 5.0;
            
            const probabiltyYes = Math.min(Math.max(rawProbYes, 0.5), 9.5);
            const probabiltyNo = 10 - probabiltyYes

            const totalYes = bucket[i] ? bucket[i].totalYes : 0
            const totalNo  = bucket[i] ? bucket[i].totalNo : 0

            const totalOrders = totalYes > totalNo ? totalYes : totalNo
            const topOrder = totalYes > totalNo ? 'yes' : 'no'
            return {
                probabiltyYes,
                probabiltyNo,
                totalOrders,
                topOrder,
                time : new Date(from + i * timeSlotDuratoinMs).toLocaleString()
            }
            
        })
        console.log(probabilityStatus)
        res.status(200).json({
            probabilityStatus,
            
        })
}

const getPrevOrders = async(evId:string, before:number): Promise<{probYes:number, probNo: number}> => {
    const ordersQuant = await prismaClient.orders.groupBy({
        by:['type','side' ,'eventId'],
        where:{
            eventId:evId,
            type:'buy',
            createdAt: {
                lte : new Date(before)
            }
        },
        _sum:{
            quantity:true
        }
    })
    let yes = 0;
    let no = 0;

    console.log(ordersQuant)
    for(const quant of ordersQuant){
        if(quant.side ==='yes'){
            yes += quant._sum.quantity ?? 0
        }
        else if(quant.side === 'no'){
            no += quant._sum.quantity ?? 0
        }
    }

    const probYes = yes / (yes + no) * 10.0
    const probNo = 10 - probYes
    
    return{
        probYes:yes,
        probNo:no
    }
}


export const createEvent = async(req:Request<{},{},{title:string, type:'bull'|'bear'|'neautral', startTime: Date, endTime:Date, liquidity:number}> , res: Response, next: NextFunction) => {

    const {title , type, startTime, endTime, liquidity} = req.body;
    const orders:IOrder[] = []
    const redis =  redisClient();
    const neautralWeight = [0.07, 0.10, 0.13, 0.15, 0.15, 0.13, 0.10, 0.07]
    const bullWeights = [0.03, 0.05, 0.07, 0.10, 0.15, 0.20, 0.20, 0.20]
    const bearWeight = [0.20, 0.20, 0.20, 0.15, 0.10, 0.07, 0.05, 0.03]


    const price = [2.5,3.5, 4.5, 5.0, 5.5, 6.5,8.0,9.0]

    const liquidityPerSide = Math.floor(liquidity/ 2)

    await prismaClient.$transaction(async(tx) => {
        const event = await tx.events.create({
            data:{
                title,
                status:'ongoing',
                startTime: new Date(startTime),
                EndTime: new Date(endTime)
            }
        })

        switch(type){
            case 'bull':{
                  for(let i = 0; i < price.length; i++){
                 
                  const qty = Math.floor(liquidityPerSide * bullWeights[i]! * (0.9 + Math.random() * 0.2));
                  const qtyNo = Math.floor(liquidityPerSide * bearWeight[i]! * (0.9 + Math.random() * 0.2));
                  
                  orders.push({
                    eventId:event.id,
                    price:price[i]!,
                    qty,
                    side:'yes',
                    type:'sell'
                  }) 

                  orders.push({
                    eventId:event.id,
                    price:price[i]!,
                    qty:qtyNo,
                    side:'no',
                    type:'sell'
                  }) 
                  }
                  break;
            }

            case 'bear':{
                  for(let i = 0; i < price.length; i++){
                 
                  const qtyNo = Math.floor(liquidityPerSide * bullWeights[i]! * (0.9 + Math.random() * 0.2));
                  const qty = Math.floor(liquidityPerSide * bearWeight[i]! * (0.9 + Math.random() * 0.2));
                  
                  orders.push({
                    eventId:event.id,
                    price:price[i]!,
                    qty,
                    side:'yes',
                    type:'sell'
                  }) 

                  orders.push({
                    eventId:event.id,
                    price:price[i]!,
                    qty:qtyNo,
                    side:'no',
                    type:'sell'
                  }) 
                  }
                  break;
            }

            case 'neautral':{
                  for(let i = 0; i < price.length; i++){
                 
                  const qtyNo = Math.floor(liquidityPerSide * neautralWeight[i]! * (0.9 + Math.random() * 0.2));
                  const qty = Math.floor(liquidityPerSide * neautralWeight[i]! * (0.9 + Math.random() * 0.2));
                  
                  orders.push({
                    eventId:event.id,
                    price:price[i]!,
                    qty,
                    side:'yes',
                    type:'sell'
                  }) 

                  orders.push({
                    eventId:event.id,
                    price:price[i]!,
                    qty:qtyNo,
                    side:'no',
                    type:'sell'
                  }) 
                  }
                  break;
            }
        }

        for(const {eventId,price, type,side, qty} of orders){
            console.log(eventId,price, type,side, qty)
           redis.lpush('orderQueue', JSON.stringify({
            eventId,
            price,
            type,
            side,
            qty,
        })
    );
        }
    })

    res.status(200).json({
        message:`Event created with initial liquidity of ${liquidity}`
    })
}

export const getUserBalance = async(req : Request<{id:string}>, res: Response ,next: NextFunction) => {

    const {id} = req.params;

    const balance = await prismaClient.user.findUnique({where:{id},
    select:{
        balanace:true
    }})

    if(!balance){
        throw new Error('Incorrect Id')
    }

    res.status(200).json({
        balance: (balance.balanace)
    })

}