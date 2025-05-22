import { Worker } from 'bullmq'
import { prismaClient } from '@repo/prisma/prisma'

const dbWorker = new Worker('dbSyncQueue', async(job) => {
    try{
        console.log('trying')
        await prismaClient.orders.create({
            data: job.data
        })
        console.log('done.', job.data)
    }catch(e){
        console.log(e)
    }
}, {
    connection:{
        host:'127.0.0.1',
        port:6379
    }

}
)