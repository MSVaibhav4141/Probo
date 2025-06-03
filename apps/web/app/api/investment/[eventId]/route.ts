import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const SERVER = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export default async function GET(req: NextRequest, res: NextResponse){

    // const eventId = await req.params
    // const { data } = await axios.get(`${SERVER}/get/event/order/`)    
}