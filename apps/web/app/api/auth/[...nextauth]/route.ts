import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { authOption } from "../../../../lib/auth"

console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SEC)

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }