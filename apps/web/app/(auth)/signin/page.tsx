import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOption } from "../../../lib/auth";
import {SignIn} from '@components/Auth/SignInButton'
export default async function Signin(){

    const session = await getServerSession(authOption)

    if(session){
        redirect('/')
        return;
    }

    return(<div>
       <SignIn />
    </div>)
}