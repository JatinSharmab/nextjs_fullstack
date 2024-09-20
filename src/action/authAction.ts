"use server"

import { NextResponse } from "next/server";
import { hashPassword } from "../../lib/auth";
import prisma from "../../lib/prisma";

export const signUp= async(FormData:FormData)=>{
    "use server";
    const firstname = FormData.get("firstname") as string ;
    const lastname = FormData.get("lastname") as string ;
    const email = FormData.get("email") as string ;
    const password = FormData.get("password") as string;
    const confirmPassword = FormData.get("confirmPassword") as string | undefined;
    const existingUser = await prisma.emUser.findFirst({
      where: {
        userEmail: email,
      },
    });
    console.log(email)
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }
    
    
    const hashedPassword = await hashPassword(password);
    console.log("===============1==============")

    const user = await prisma.emUser.create({
      data: {
        userEmail: email,
        userPassword: hashedPassword,
        userLastName:lastname,
        userFirstName: firstname,
        userRoleId: 1, 
      },
    });

  }