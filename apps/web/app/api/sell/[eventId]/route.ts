import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOption } from "../../../../lib/auth";


export async function POST(req: NextRequest,
    {params} : {params: Promise<{eventId: string}>}

){
    const session = await getServerSession(authOption)
    
    if(!session){
        return alert('login')
    }
    const eventId = (await params).eventId;
    const {price, type, side, qty, exitFromOrderId} = await req.json();

    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/initiate/order`, {
        eventId,
        price,
        type,
        side,
        qty,
        exitFromOrderId
    },{
        headers:{
            Authorization : session.backendToken
        }
    })

    return NextResponse.json({
        message: data
    })
}