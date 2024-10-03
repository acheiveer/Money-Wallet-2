"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
import axios from "axios";

export async function createOnRampTransaction(amount: number, provider: string){
    const session = await getServerSession(authOptions);
    const token = Math.random().toString();
    // const token = await axios.get("https://api.hdfc.com/getToken",{
    //     amount:   
    // })
    const userId = session.user.id;
    if(!userId){
        return {
            message: "User not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId: Number(userId),
            amount:amount,
            status:"Processing",
            startTime: new Date(),
            provider,
            token: token
        }
    })

    return{
        message: "On ramp transaction added"
    }
}