const MULTIPLIER = 1e13;
import { RedisClientType } from "@repo/redis-client/redis";

type IManageOrder ={
    mssg?: string
    currentOrderBook ?: {[price: string]: string}
    remainingQty ?: number
}

interface ISetData{
    id:string,
    price: number,
    quantity: number,
    createdAt:number
}

 export class OrderManager{
    redis : RedisClientType
    orderBook : any
    order: Record<string, string>
    private static instance: OrderManager;

    private constructor(redis: RedisClientType){
        this.redis = redis
        this.orderBook = {}
        this.order = {}
    }

    static getInstace(redis: RedisClientType){
        if(!OrderManager.instance){
            OrderManager.instance = new OrderManager(redis)
        }
        return OrderManager.instance;
    }

    async matchOrder(id:string, type:string, side:string, qty:number, price: number, eventId:string): Promise<any>{
        let orderBookKey : string = `orderbook:${type === 'buy' ? 'sell' : 'buy'}:${side}`
        let remainingQty = qty
        const matchedOrder = []
        const partialMatchedOrder = []
        if(type === 'buy'){
            const result = await this.redis.zrange(orderBookKey,0, -1)
            for(let rawRes of result){
                const parsedResult: ISetData = JSON.parse(rawRes)

                if(remainingQty === 0){
                    break;
                }
                
                if(price >= parsedResult.price){
                    
                    if(parsedResult.quantity > remainingQty){
                        const leftQty = parsedResult.quantity - remainingQty;
                        parsedResult.quantity = leftQty;
                        
                        await this.redis.hincrby(`${orderBookKey}:${eventId}`, parsedResult.price.toString(), -remainingQty)
                        partialMatchedOrder.push(
                            {
                                buyOrderId:id,
                                sellOrderId: parsedResult.id,
                                price:parsedResult.price,
                                quantity:remainingQty,
                                timeStamp:new Date()
                            }
                        )
                        remainingQty = 0;
                        await this.redis.multi()
                        .zrem(orderBookKey,rawRes)
                        .zadd(orderBookKey,parsedResult.price * MULTIPLIER + (parsedResult.createdAt), JSON.stringify(parsedResult) )
                        .exec()
                        
                        break;
                    }
                    else if(parsedResult.quantity <= remainingQty){
                        remainingQty = remainingQty - parsedResult.quantity;
                        await this.redis.hincrby(`${orderBookKey}:${eventId}`, parsedResult.price.toString(), -parsedResult.quantity)

                        matchedOrder.push(
                            {
                                buyOrderId:id,
                                sellOrderId: parsedResult.id,
                                price:parsedResult.price,
                                quantity:parsedResult.quantity,
                                 timeStamp:new Date()
                            }
                        )
                        await this.redis.zrem(orderBookKey,rawRes)
                    }
                }else{
                    break;
                }
            }
        }
        else if(type === 'sell'){
            const result = await this.redis.zrevrange( orderBookKey, 0, -1) as string[];
            
            for(let rawRes of result){
                const parsedResult: ISetData = JSON.parse(rawRes)
                
                if(parsedResult.price < price || remainingQty === 0){
                    break;
                }
                
      
                    
                    if(parsedResult.quantity > remainingQty){
                        const leftQty = parsedResult.quantity - remainingQty;
                        
                        parsedResult.quantity = leftQty;
                        await this.redis.hincrby(`${orderBookKey}:${eventId}`, parsedResult.price.toString(), -remainingQty)

                        partialMatchedOrder.push(
                            {
                                buyOrderId:parsedResult.id,
                                sellOrderId:id,
                                price:parsedResult.price,
                                quantity:remainingQty,
                                timeStamp:new Date()
                            }
                        )
                        remainingQty = 0;
                        await this.redis.multi()
                        .zrem(orderBookKey, rawRes )
                        .zadd(orderBookKey,-parsedResult.price * MULTIPLIER + (parsedResult.createdAt), JSON.stringify(parsedResult) )
                        .exec()
                        break;
                    }
                    else if(parsedResult.quantity <= remainingQty){
                        remainingQty = remainingQty - parsedResult.quantity;
                        await this.redis.hincrby(`${orderBookKey}:${eventId}`, parsedResult.price.toString(), -parsedResult.quantity)

                        matchedOrder.push(
                              {
                                buyOrderId:parsedResult.id,
                                sellOrderId: id,
                                price:parsedResult.price,
                                quantity:parsedResult.quantity,
                                timeStamp:new Date()
                            }
                        )
                        await this.redis.zrem(orderBookKey, rawRes)
                    }
                
            }
        }

        return {
            matchedOrder,
            partialMatchedOrder,
            remainingQty
        }
    }

    async updateOrderBook(type: string, remainingQty: number, side:string, price:string){
          const orderBookId = `orderbook:${type}:${side}`
          const res = await this.redis.hgetall(orderBookId) 
                let orderBook = Object.fromEntries(Object.entries(res as Record<string , string>)) 
                
                if(orderBook){   
                    orderBook = {...orderBook, [price]: ((parseInt(orderBook[price] as string) ?? 0) + remainingQty).toString()}
                }

                await this.redis.hset(orderBookId, orderBook)
    }
}

