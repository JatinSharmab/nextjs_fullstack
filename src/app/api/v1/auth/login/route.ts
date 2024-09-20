import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";
import { generateToken, verifyPassword } from "../../../../../../lib/auth";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.emUser.findFirst({
      where: { userEmail: email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.userPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken(user.userId);
    console.log("=====================", user);
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
