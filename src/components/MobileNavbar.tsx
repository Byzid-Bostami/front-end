"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Search from "./Search";
import { LuMenu } from "react-icons/lu";
import { MdClose } from "react-icons/md";

const MobileNavbar = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? "text-[#00C298] transition-all duration-150" : "";

  return (
    <div className="relative flex justify-between items-center border-b border-black/5 py-4 bg-white">
      <div className="flex items-center">
        <Link href="/"  onClick={() => setToggle(false)}>
          <Image
            className="object-contain w-[70px] min-w-[70px] h-auto"
            src="/logo.png"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>
      </div>

      {/* Search input & menu toggle */}
      <div className="flex items-center space-x-3">
        <div>
          <Search />
        </div>
        <button
          className="transition-all duration-150"
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? <MdClose size={28} /> : <LuMenu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed min-h-screen bg-white top-14 left-0 w-full transition-transform duration-300 ${
          toggle ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-10 capitalize text-xl font-medium p-4 space-y-5">
          <Link
            onClick={() => setToggle(false)}
            className={isActive("/feature")}
            href="/feature"
          >
            feature
          </Link>
          <hr className="w-full" />
          <Link
            onClick={() => setToggle(false)}
            className={isActive("/news")}
            href="/news"
          >
            news
          </Link>
          <hr className="w-full" />
          <Link
            onClick={() => setToggle(false)}
            className={isActive("/tech")}
            href="/tech"
          >
            tech
          </Link>
          <hr className="w-full" />
          <Link
            onClick={() => setToggle(false)}
            className={isActive("/health")}
            href="/health"
          >
            health
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
