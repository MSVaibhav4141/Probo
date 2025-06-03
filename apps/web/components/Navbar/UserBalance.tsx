'use client'

import { useEffect } from "react";
import useProboStore from "../../store/store";


const UserBalance = ({id}:{id:string| null}) => {

    const { getBalance, balance } = useProboStore();

    useEffect(() => {
        if(id){
            getBalance(id)
        }
    }, [id])
    return (
          <div className="px-3 py-1 rounded border text-sm font-semibold">₹{balance}</div>
    )
}

export default UserBalance;