import connectRedis, { redisClient } from "@repo/redis-client/redis";
import { OrderManager } from "./manager/orderManager";
import { dbSync, tradeSync, pubSync } from "@repo/bullMq/bullmq"
import { v4 as uuidv4 } from 'uuid';

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
            const {type, side , qty , price, eventId} = JSON.parse(result[1])
            const orderBookId = `orderbook:${type}:${side}`
            const manageOrder = OrderManager.getInstace(redis)
            const orderId = uuidv4()
            const { matchedOrder,partialMatchedOrder,remainingQty} = await manageOrder.matchOrder(orderId, type ,side ,qty ,price,eventId)
            
            await dbSync.add('syncDb', {
                 id:orderId,
                 userId : 'cmax4ttmx00007kkczluo6q1m',
                 eventId: eventId, 
                 price,
                 type,
                 side,
                 createdAt: new Date(),
                 status: remainingQty === 0 ? 'fullfilled' : 'pending',
                 quantity:qty,
                 leftQty:remainingQty
            },
        )
            if ((!partialMatchedOrder.length && matchedOrder.length > 0 || remainingQty === qty) && remainingQty > 0){
                    const time = Date.now()
                    await redis.zadd(orderBookId, price * 1e10 + time,JSON.stringify({id:orderId, quantity:remainingQty, price, createdAt:time,eventId}))
                }

            if(matchedOrder.length){
                for(const trade of matchedOrder){
                    await tradeSync.add('tradeSync', {
                            orderMatched:trade,
                            type
                        },
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

