import { signIn } from "next-auth/react";
import React from "react";

export const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => signIn()}
        className="rounded-2xl bg-slate-700 px-3 py-2 text-white transition-all hover:bg-slate-900"
      >
        Sign-In
      </button>
    </div>
  );
};
