import Redis from "ioredis";
let isConnected = false;

let client: Redis;

export type RedisClientType = Redis;

export default async function connectRedis(): Promise<void>{
    if(!client){
        console.log('hiiii bhai ', process.env.REDIS_URL)
        client = new Redis({
            host:process.env.REDIS_URL || 'localhost'
        })
        client.on('error', (err: any)=> {console.log(err,process.env.REDIS_URL,process.env.DATABASE_URL)})
    }
    
}

export const redisClient = (): Redis => {
    if(!client){
        throw Error("Client must be connected before using")
    }
    return client;
}

export const pub = () => new Redis({
            host:process.env.REDIS_URL || 'localhost'
        })
export const sub = () => new Redis({
            host:process.env.REDIS_URL || 'localhost'
        })
