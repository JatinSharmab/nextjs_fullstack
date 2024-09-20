"use client";

import Input from "@/components/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpSchema } from "@/components/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpData } from "@/components/interfaces/frontend";
import ErrorMessage from "@/components/error-message";
import { toast, Toaster } from "sonner";

const Signup = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema), 
  });

  const onSubmit = async (data: SignUpData) => {
    console.log("+++++++++++++++++++++++++++++++++++++");
    const res = await fetch("http://localhost:3000/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast.success("SignUp successfull! Redirecting to login...", {
        duration: 2000, 
        position: "top-right", 
      });

      setTimeout(() => {
        router.push("/login");
      }, 2000); 
      console.log("Signup Successfulllysdfsdf");
    } else {
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-red-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 rounded-t-lg border border-gray-300 shadow-lg bg-cyan-50 p-14">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign Up
          </h2>
          <Toaster richColors position="top-right" />

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="firstname" className="m-5 ml-0">
                  First Name
                </label>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  register={register}
                />
                {errors.firstname && (
                  <ErrorMessage text={errors.firstname.message || ""} />
                )}
              </div>

              <div>
                <label htmlFor="lastname" className="m-5 ml-0">
                  Last Name
                </label>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  register={register}
                />
                {errors.lastname && (
                  <ErrorMessage text={errors.lastname.message || ""} />
                )}
              </div>

              <div>
                <label htmlFor="email" className="m-5 ml-0">
                  Email address
                </label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Email address"
                  register={register}
                />
                {errors.email && (
                  <ErrorMessage text={errors.email.message || ""} />
                )}
              </div>

              <div>
                <label htmlFor="password" className="m-5 ml-0">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  register={register}
                />
                {errors.password && (
                  <ErrorMessage text={errors.password.message || ""} />
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className="m-5 ml-0">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  register={register}
                />
                {errors.confirmPassword && (
                  <ErrorMessage text={errors.confirmPassword.message || ""} />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>

          <h2 className="ml-10">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 md:text-blue-400 underline md:underline-offset-4"
            >
              Sign In
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
