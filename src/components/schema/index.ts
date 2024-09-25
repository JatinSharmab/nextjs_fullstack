import exp from "constants";
import { z } from "zod";

interface FormData {
  lastname: string;
  firstname: string;
  email: string;
  mobile: number;
  password: string;
  confirmPassword: string;
}

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Please enter your Email.")
      .email("Invalid email formate."),
    firstname: z
      .string()
      .min(1, "Please enter your First Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
    lastname: z
      .string()
      .min(1, "Please enter your Last Name.")
      .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),

    password: z
      .string()
      .min(1, "Please enter your Password.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]+$/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 special character."
      ),
    confirmPassword: z.string().min(1, "Please confirm your Password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  userEmail: z
    .string()
    .min(1, "Please enter your Email.")
    .email("Invalid email address."),
  userFirstName: z
    .string()
    .min(1, "Please enter your First Name.")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
  userLastName: z
    .string()
    .min(1, "Please enter your Last Name.")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces."),
  userPhone: z
    .string()
    .min(1, "Please enter your Phone Number")
    .regex(
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
      "Phone number must be of 10 digit"
    ),
  userGender: z.string().min(1, "Please enter your Gender"),
  userAge: z.string().min(1, "Please enter your Age"),
});
export const signInSchema = z.object({
  email: z.string().min(1, "Please enter your Email"),
  password: z.string().min(1, "Please enter your Passworddd"),
});
export const AddProjSchema = z.object({
  projectName: z.string().min(1, "Please enter Project Name."),
  projectTechnology: z.string().min(1, "Please enter the technology"),
  projectStatus: z.string().min(1, "Please enter the status of project."),
  projectLead: z.string().min(1, "Please enter Name of Project Lead."),
  projectManager: z.string().min(1, "Please enter name of Project Manager."),
  projectClient: z.string().min(1, "Please enter name of Project Client."),
  projectManagementTool: z
    .string()
    .min(1, "Please enter project management tool."),

  projectManagementToolUrl: z
    .string()
    .min(1, "Please enter projet management tool URL."),

  projectRepoTool: z.string().min(1, "Please enter the Projet Repo Tool."),
  projectRepoToolUrl: z.string().min(1, "Please enter Project Repo URL."),

  projectDescription: z.string().min(1, "Enter Description of Project"),
});

export const editProfileSchema = z.object({});
