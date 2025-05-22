import { createClient } from "redis";
import Redis from "ioredis";
let isConnected = false;

let client: Redis;

export type RedisClientType = Redis;

export default async function connectRedis(): Promise<void>{
    if(!client){
        client = new Redis()
        client.on('error', (err: any)=> {console.log(err)})
    }
    
}

export const redisClient = (): Redis => {
    if(!client){
        throw Error("Client must be connected before using")
    }
    return client;
}

export const pub = () => new Redis()
export const sub = () => new Redis()
