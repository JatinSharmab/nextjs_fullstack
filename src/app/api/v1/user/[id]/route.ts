import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { getSession } from 'next-auth/react';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);

    console.log("params======================", id);

    const user = await prisma.emUser.findUnique({
      where: { userId: id },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }

    console.log("=====================", user);
    return NextResponse.json(
      { message: "Data Fetched successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    
    const body = await req.json(); 
    const {
      userFirstName,
      userLastName,
      userAge,
      userEmail,
      userPhone,
      // userCity,
      // userState,
      // userCountry,
      userGender
    } = body;

    console.log("params======================", id);

    
    const user = await prisma.emUser.findUnique({
      where: { userId: id },
    });
    const userrAge = parseInt(userAge)

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }
    const updatedUser = await prisma.emUser.update({
      where: { userId: id },
      data: {
        userFirstName,
        userLastName,
        userAge : userrAge,
        userEmail,
        userPhone,
        // userCity,
        // userState,
        // userCountry,
        userGender,
      },
    });

    console.log("=====================", updatedUser);
    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error occurred while updating user" },
      { status: 500 }
    );
  }
}

  

