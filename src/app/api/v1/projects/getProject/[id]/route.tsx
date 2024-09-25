import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../../lib/prisma";
import { getSession } from "next-auth/react";

// API for getting the project details

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = parseInt(params.id);
  
      console.log("params======================", id);
  
      const user = await prisma.emProjects.findFirst({
        where: { projectId: id, },
         
      });
  
      if (!user) {
        return NextResponse.json(
          { message: "Projects Not Found" },
          { status: 401 }
        );
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