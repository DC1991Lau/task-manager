import { useSession, signOut } from "next-auth/react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import React from "react";
import Link from "next/link";

export const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between">
      <div>
        <Link href="/">
          <div className="text-2xl font-semibold">
            Task<strong className="text-blue-800">.</strong>Manager
          </div>
        </Link>
      </div>
      <button
        onClick={() => signOut()}
        className="flex cursor-pointer items-center gap-3 rounded bg-gray-200 py-2 px-4 text-sm font-medium leading-none text-gray-600 hover:bg-gray-300"
      >
        <img
          className="h-8 w-8 rounded-full bg-white"
          src={session?.user?.image}
        />
        <div>{session?.user?.name}</div>
      </button>
    </div>
  );
};
