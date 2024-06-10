"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
  return (
    <div className=" flex p-4 items-center justify-between">
      <Link href="/">
        <Image src="/logoTech.png" alt="TechTerview" width={160} height={100} />
      </Link>
      <ul className="flex gap-4 items-center p-4 ">
        <Link href="/questions">
          <li
            className={`font-mono font-bold text-blue-600 hover:text-cyan-500 px-3 py-2 rounded ${
              pathname === "/questions"
                ? "custom-underline custom-underline-transition"
                : "transition-all duration-300 ease-in-out"
            }`}
          >
            Questions
          </li>
        </Link>
        <Link href="/interviews">
          <li
            className={`font-mono font-bold text-blue-600 hover:text-cyan-500 px-3 py-2 rounded ${
              pathname === "/interviews"
                ? "custom-underline custom-underline-transition"
                : "transition-all duration-300 ease-in-out"
            }`}
          >
            Interviews
          </li>
        </Link>
        <Link href="/feedback">
          <li
            className={`font-mono font-bold text-blue-600 hover:text-cyan-500 px-3 py-2 rounded ${
              pathname === "/feedback"
                ? "custom-underline custom-underline-transition"
                : "transition-all duration-300 ease-in-out"
            }`}
          >
            Feedback
          </li>
        </Link>
        <Link href="/settings">
          <li
            className={`font-mono font-bold text-blue-600 hover:text-cyan-500 px-3 py-2 rounded ${
              pathname === "/settings"
                ? "custom-underline custom-underline-transition"
                : "transition-all duration-300 ease-in-out"
            }`}
          >
            Settings
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
