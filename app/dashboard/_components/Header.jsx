"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
function Header() {
  const pathname = usePathname();
  return (
    <div className=" flex p-4 items-center justify-between bg-secondary shadow-sm h-[96px]">
      <Link href="/">
        <Image src="/logoTech.png" alt="TechTerview" width={160} height={100} />
      </Link>
      <ul className=" hidden md:flex gap-4 items-center p-4 ">
        <Link href="/dashboard">
          <li
            className={`font-mono font-bold text-blue-600 hover:text-cyan-500 px-3 py-2 rounded ${
              pathname === "/dashboard"
                ? "custom-underline custom-underline-transition"
                : "transition-all duration-300 ease-in-out"
            }`}
          >
            Dashboard
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
        <Link href="/about-us">
          <li
            className={`font-mono font-bold text-blue-600 hover:text-cyan-500 px-3 py-2 rounded ${
              pathname === "/about-us"
                ? "custom-underline custom-underline-transition"
                : "transition-all duration-300 ease-in-out"
            }`}
          >
            About Us
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
