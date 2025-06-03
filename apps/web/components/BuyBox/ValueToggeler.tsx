'use client'

import { Dispatch, SetStateAction, useState } from "react"


export default function ValueToggeler({value, setValue, min, max,gap}: {value:number, setValue:Dispatch<SetStateAction<number>>, min:number , max:number, gap:number}){
  
    const style = `text-blue-500 border-[0.5px] border-gray-300 rounded-lg w-5 h-5 flex items-center justify-center bg-background`
    return(
        <div className="flex border-1 border-gray-200 p-1 items-center w-40 justify-between rounded-md text-lg">
            <button disabled={value === 0.5} onClick={() => setValue(prev => Math.max(min, prev - gap))} className={style}>-</button>
            <span className="font-bold">{value}</span>
            <button disabled={value === 9.5} onClick={() => setValue(prev => Math.min(max, prev + gap))} className={`${style}`}>+</button>
        </div>
    )
} 