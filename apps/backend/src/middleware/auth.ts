import { RequestHandler } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
export const auth:RequestHandler = (req, res, next) => {

    const token = req.headers.authorization;
    console.log(process.env.JWT_SECRET, 'sdfsdfsd' ,req.headers.authorization)
    if(token && process.env.JWT_SECRET){
        console.log(token)
        const isVerified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload ;
        if(isVerified){
            req.user =isVerified.userId;
            next()
        }else{
             res.json(
                {
                    message:"wrong token"
                }
            ).status(401)
        }

    }else{
        throw new Error("Give token or secret")
    }
}