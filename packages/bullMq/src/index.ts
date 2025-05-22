import { Queue} from "bullmq";



export const dbSync = new Queue('dbSyncQueue', {
    connection:{
        host:'127.0.0.1',
        port:6379
    }
})
export const tradeSync = new Queue('tradeSyncQueue', {
    connection:{
        host:'127.0.0.1',
        port:6379
    }
})
export const pubSync = new Queue('pubSyncQueue', {
    connection:{
        host:'127.0.0.1',
        port:6379
    }
})

