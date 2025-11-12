import {authOptions} from "@/utils/authOptions";
import NextAuth from 'next-auth/next'
declare module "next-auth"{
    interface Session{
        user:{
            id?: string | null,
            name?: string | null,
            email?: string | null,
            image?: string | null,
        }
    }
}
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};