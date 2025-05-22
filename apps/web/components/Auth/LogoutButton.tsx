'use client'
import { signOut } from "next-auth/react"

export const Logout = () => {

    return(
        <div>
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}
