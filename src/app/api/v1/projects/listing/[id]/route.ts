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

    const user = await prisma.emProjects.findMany({
      where: { projectUserId: id,projectDeletedAt:null },
       
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

//API for deleting the project in the database

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const user = await prisma.emProjects.findFirst({
      where: { projectId: id },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }
    const updatedUser = await prisma.emProjects.update({
      where: { projectId: id },
      data: {
        projectDeletedAt: true,
      },
    });

    console.log("=====================", updatedUser);
    return NextResponse.json(
      { message: "User Deleted successfully", DeleteProject: updatedUser },
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

//API for adding the new project in the specific user with the help of the user id

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {
      projectName,
      projectTechnology,
      projectStatus,
      projectManager,
      projectLead,
      projectClient,
      projectManagementTool,
      projectRepoTool,
      projectManagementToolUrl,
      projectRepoToolUrl,
      projectDescription,
    } = await req.json();

    const id = parseInt(params.id);

    console.log("===============1==============");

    const projects = await prisma.emProjects.create({
      data: {
        projectUserId: id,
        projectName: projectName as string,
        projectTechnology: projectTechnology as string,
        projectStatus: projectStatus as string,
        projectManager: projectManager as string,
        projectLead: projectLead as string,
        projectClient: projectClient as string,
        projectManagementTool: projectManagementTool as string,
        projectManagementToolUrl: projectManagementToolUrl as string,
        projectRepoTool: projectRepoTool as string,
        projectRepoToolUrl: projectRepoToolUrl as string,
        projectDescription: projectDescription as string,
      },
    });
    console.log("===================2============");
    console.log(projects);
    return NextResponse.json(
      { message: "New project added successfully", projects },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// API for editing the existing project  in the specific user with the help of the user id and project id

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const body = await req.json();
    const { projectName,
      projectTechnology,
      projectStatus,
      projectManager,
      projectLead,
      projectClient,
      projectManagementTool,
      projectRepoTool,
      projectManagementToolUrl,
      projectRepoToolUrl,
      projectDescription, } =
      body;

    console.log("params======================", id);

    const user = await prisma.emProjects.findUnique({
      where: { projectId: id },
    });

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 401 });
    }
    const updatedProject = await prisma.emProjects.update({
      where: { projectId: id },
      data: {
        projectName,
        projectTechnology,
        projectStatus,
        projectManager,
        projectLead,
        projectClient,
        projectManagementTool,
        projectRepoTool,
        projectManagementToolUrl,
        projectRepoToolUrl,
        projectDescription
      },
    });

    console.log("=====================", updatedProject);
    return NextResponse.json(
      { message: "User updated successfully", user: updatedProject },
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
