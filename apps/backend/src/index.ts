import 'dotenv/config'
import express from 'express'
import { router } from './router/router'
import connectRedis from '@repo/redis-client/redis'
import cors from 'cors'
const app = express()

app.use(cors())
app.use(express.json());
app.use('/v1', router);


(async() => {

    await connectRedis();

    app.listen(3001, () => {
        console.log('Server is up')
    });

})();