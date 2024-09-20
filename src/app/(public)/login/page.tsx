"use client";

import Input from "@/components/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react"; 
import { Toaster, toast } from "sonner"; 
import { SignInData } from "@/components/interfaces/frontend"; 
import { signInSchema } from "@/components/schema"; 
import ErrorMessage from "@/components/error-message";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInData) => {
    const res = await signIn("credentials", {
      redirect: false, 
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      toast.error("Invalid email or password"); 
    } else {
      toast.success("Login Successful");
      // router.push("/dashboard"); 
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-red-100">
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 rounded-t-lg border border-gray-300 shadow-lg bg-cyan-50 p-14">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
          <Toaster richColors position="top-right" />
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="m-5 ml-0">
                  Email address
                </label>
                <Input
                  type="string"
                  name="email"
                  placeholder="Email address"
                  register={register}
                />
                {errors.email && <ErrorMessage text={errors.email.message || ""} />}
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
                {errors.password && <ErrorMessage text={errors.password.message || ""} />}
              </div>
            </div>
            <button
              type="submit"
              className="my-0 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </form>
          <p className="group relative flex justify-center">OR</p>
          <button
            onClick={() => signIn("google")} 
            className="mt-0 group relative flex justify-center ml-24 py-2 px-3 border text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In with Google
          </button>
          <h2 className="ml-12">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 md:text-blue-400 underline md:underline-offset-4">
              SignUp
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
