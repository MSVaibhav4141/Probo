import { Queue} from "bullmq";



export const dbSync = new Queue('dbSyncQueue', {
    connection:{
        host:process.env.REDIS_URL,
        port:6379
    }
})
export const tradeSync = new Queue('tradeSyncQueue', {
    connection:{
        host:process.env.REDIS_URL,
        port:6379
    }
})
export const pubSync = new Queue('pubSyncQueue', {
    connection:{
        host:process.env.REDIS_URL,
        port:6379
    }
})

