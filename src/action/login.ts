"use server"

import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";

const credentialsLogin = async (email:string,password:string)=>{
   

    if(!email || !password) throw new Error ("Please provide all fields");

    try{
      await signIn("credentials",{
        email,
        password,
      })
    }catch(error){
      const err = error as CredentialsSignin;
      return err.message;
    }

  }
  export {credentialsLogin}