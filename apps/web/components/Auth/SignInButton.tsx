'use client'
import { signIn } from "next-auth/react"

export const SignIn = () => {

    return(
        <div>
            <button onClick={() => signIn('google')}>Google</button>
        </div>
    )
}
