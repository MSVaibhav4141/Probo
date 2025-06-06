import connectRedis, { redisClient } from "@repo/redis-client/redis";
import { OrderManager } from "./manager/orderManager";
import { dbSync, tradeSync, pubSync } from "@repo/bullMq/bullmq"
import { v4 as uuidv4 } from 'uuid';

const MULTIPLIER = 1e13;
const MAX_TIMESTAMP = 9999999999999;
interface IOrderBook {
    [price: string] : string
}

(async() => {
    await connectRedis();
    const redis = redisClient();
    while(true){
        const result = await redis.brpop('orderQueue', 0)
        console.log(result)
        if(result){
            const {type, side , qty , price, eventId, exitFromOrderId} = JSON.parse(result[1])
            const orderBookId = `orderbook:${type}:${side}`
            const manageOrder = OrderManager.getInstace(redis)
            const orderId = uuidv4()
            const { matchedOrder,partialMatchedOrder,remainingQty} = await manageOrder.matchOrder(orderId, type ,side ,qty ,price,eventId)
            console.log('dbbbbbbbbbbbbb', orderId)
            await dbSync.add('syncDb', {
                 id:orderId,
                 userId : 'cmbgy5ty800007klktdyx9s6f',
                 eventId: eventId, 
                 price,
                 type,
                 side,
                 exitFromOrderId: exitFromOrderId ,
                 createdAt: new Date(),
                 status: remainingQty === 0 ? 'fullfilled' : 'pending',
                 quantity:qty,
                 leftQty:remainingQty
            },
        )
            if ((!partialMatchedOrder.length && matchedOrder.length > 0 || remainingQty === qty) && remainingQty > 0){
                    const time = Date.now()

                    const res = await redis.hget(`${orderBookId}:${eventId}`, price)

                    if(res){
                        await redis.hincrby(`${orderBookId}:${eventId}`, price, remainingQty)
                    }else{
                        await redis.hset(`${orderBookId}:${eventId}`, {[price] : remainingQty})
                        
                    }

                    console.log('redissssss', {id:orderId, quantity:remainingQty, price, createdAt:time,eventId})                    
                    await redis.zadd(orderBookId, price * MULTIPLIER + (type === 'sell' ? time : MAX_TIMESTAMP - time),JSON.stringify({id:orderId, quantity:remainingQty, price, createdAt:time,eventId}))
                    
                }

                let bestPrice: number | null = null;
                
                let orderBookKey : string = `orderbook:${type === 'buy' ? 'sell' : 'buy'}:${side}`
                const res = type === 'sell'
                  ? await redis.zrange(orderBookId, 0, -1)
                  : await redis.zrevrange(orderBookId, 0, -1);
                  
                if (res[0]) {
                  bestPrice = JSON.parse(res[0]).price;
                }
                await redis.hset(`${orderBookKey}:${eventId}`, { bestPrice, availQty:remainingQty });

                
            if(matchedOrder.length){
                for(const trade of matchedOrder){
                    await tradeSync.add('tradeSync', {
                            orderMatched:trade,
                            type                        },
                     {
                    attempts:4,
                    backoff:{
                        type:"exponential",
                        delay:1000
                    }
                })
                }
            }
            if(partialMatchedOrder.length){
                  for(const trade of partialMatchedOrder){
                   await tradeSync.add('tradeSync', {
                        orderMatched:trade,
                        type
                    },
                {attempts:4,
                backoff:{
                    type:"exponential",
                    delay:1000
                }
                })
                }
               
            }

            const sellOrderbookYes = await redis.zrange(`orderbook:sell:yes`, 0 ,-1)
            const sellOrderbookNo = await redis.zrange(`orderbook:sell:no`, 0 ,-1)

            await pubSync.add('pubSyncQueue', {
                eventId,
                orderbook:{
                yes:sellOrderbookYes,
                no:sellOrderbookNo
                }
            })

        }



    }
})();

