"use client";
import { signIn, signOut } from "next-auth/react";

export const Appbar = () => {
  return (
    <div>
      <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};
