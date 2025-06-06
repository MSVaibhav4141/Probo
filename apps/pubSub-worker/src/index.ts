import { pub } from "@repo/redis-client/redis";
import { Worker } from 'bullmq'

const publisher = pub()
console.log(process.env.REDIS_URL)
const pubWorker = new Worker('pubSyncQueue', async( job ) => {
    const {eventId , orderbook} = job.data;

    const orders = orderbook.yes.map(JSON.parse);
    let uniqueOrder: {quantity: number, price:number}[] = []
    const ordersNo = orderbook.no.map(JSON.parse);
    let uniqueOrderNo: {quantity: number, price:number}[] = []

    for(const order of orders){
        if(order.eventId === eventId){
            let lastOrder = uniqueOrder[uniqueOrder.length - 1]
    
        
                if(lastOrder && lastOrder.price === order.price){
                    lastOrder.quantity += order.quantity
                }else{
                    uniqueOrder.push({quantity:order.quantity, price:order.price})
                }
            
        }
    }
    for(const order of ordersNo){
        if(order.eventId === eventId){

            let lastOrder = uniqueOrderNo[uniqueOrderNo.length - 1]
    
        
                if(lastOrder && lastOrder.price === order.price){
                    lastOrder.quantity += order.quantity
                }else{
                    uniqueOrderNo.push({quantity:order.quantity, price:order.price})
                }
        }
        
    }
    if(job.data){
        if(uniqueOrder.length > 5){
          uniqueOrder = uniqueOrder.splice(0,5)  
        }
        if(uniqueOrderNo.length > 5){
          uniqueOrderNo = uniqueOrderNo.splice(0,5)  
        }
        if(uniqueOrder.length < 5){
            let currentLength = uniqueOrder.length;
            
            while(currentLength < 5){
                let lastOrder = uniqueOrder[uniqueOrder.length - 1]?.price ?? 0;
                uniqueOrder.push({price:lastOrder+0.5, quantity:0})
                currentLength += 1;
           }
        }
        if(uniqueOrderNo.length < 5){
            let currentLength = uniqueOrderNo.length;
            
            while(currentLength < 5){
                let lastOrder = uniqueOrderNo[uniqueOrderNo.length - 1]?.price ?? 0;
                uniqueOrderNo.push({price:lastOrder+0.5, quantity:0})
                currentLength += 1;
           }
        }
        publisher.publish('orderbook:update', JSON.stringify({eventId, orderbook:{yes: uniqueOrder, no: uniqueOrderNo}}))
    }
},
{connection:{
    host:process.env.REDIS_URL,
    port:6379
}})

