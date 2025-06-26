'use client'
import { Button } from "@repo/ui/button"
import { Dispatch, SetStateAction, useState } from "react"

export const TabButton = ({currentState , setState, probabilityYes, probabiltyNo}:{probabilityYes:number, probabiltyNo:number ,currentState: string,setState:Dispatch<SetStateAction<string>>}) => {
    const style: Record<string, string> = {
        "yes" : "bg-blue-500",
        "no"  : "bg-red-500 "
    }
    return(
    <div className="flex w-full h-9 rounded-xl">
        <Button className={`${currentState === 'yes' &&  style[currentState]} flex-1 rounded-3xl`} onClick={() => setState('yes')}>Yes {probabilityYes}</Button>
        <Button className={`${currentState === 'no' && style[currentState]} flex-1 rounded-3xl`} onClick={() => setState('no')}>No {probabiltyNo}</Button>
    </div>

    )
}