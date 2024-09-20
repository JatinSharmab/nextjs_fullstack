import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../../lib/prisma';
import { hashPassword } from '../../../../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstname, lastname } = await req.json();

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
    console.log("===================2============")
    console.log(user)
    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
