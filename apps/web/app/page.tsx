import { getServerSession } from "next-auth";
import { authOption } from "../lib/auth";
import { Logout } from "@components/Auth/LogoutButton";

export default async function Home() {
  const session = await getServerSession(authOption)

  console.log(session?.backendToken)

  return (

    <div className="text-gray-300 bg-red-300">
      {session &&  (<>{JSON.stringify(session?.user)}<Logout /></>)}
    </div>
  );
}
