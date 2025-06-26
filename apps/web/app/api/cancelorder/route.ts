import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../../lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest,
    { params }: { params: Promise<{ orderid: string }>}
){
   const session = await getServerSession(authOption); 
    
        if(!session){
            return NextResponse.json({
                message:'Not allowes'
            })
        }
        const {orderId, qty, exit} = await request.json();

        if(exit){
          const {data} = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/cancel/exit/order`,
            {
                orderId,
                qty
            },
            {
                headers:{
                    Authorization: session.backendToken
                }
            }
        )
        
        return NextResponse.json({
            body: data, 
            params
        })
        }else{
            const {data} = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/cancel/order`,
                {
                    orderId,
                    qty
                },
                {
                    headers:{
                        Authorization: session.backendToken
                    }
                }
            )
            return NextResponse.json({
                body: data, 
                params
            })
        }
}