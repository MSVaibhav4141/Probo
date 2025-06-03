import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const SERVER = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;
    const body = await req.json()

    const {data} = await axios.post(`${SERVER}/get/qty`,body, {
        headers:{
            'Content-Type' : 'application/json'
        }
    })

    return NextResponse.json(data)
}