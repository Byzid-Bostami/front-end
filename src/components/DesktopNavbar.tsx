'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import Search from './Search';

const DesktopNavbar = () => {
    const pathname = usePathname();
    const isActive = (href: string) =>
        pathname === href ? "text-[#00C298]  transition-all duration-150" : "";

  return (
    <div className='flex justify-between space-x-4 items-center border-b border-black/5 py-4 bg-white'>
        <div className=' flex items-center md:space-x-10 lg:space-x-20'>
            <Link href={'/'}>
                <Image className='bg-cover' 
                    src="/logo.png" 
                    alt="logo" 
                    width={100} 
                    height={100}   
                />
            </Link>

            <div className='flex items-center md:space-x-3 lg:space-x-4 capitalize text-lg font-medium'>
               <Link className={` ${isActive("/feature")}`} href={'/feature'}>feature</Link>
               <Link className={` ${isActive("/news")}`} href={'/news'}>news</Link>
               <Link className={` ${isActive("/tech")}`} href={'/tech'}>tech</Link>
               <Link className={` ${isActive("/health")}`} href={'/health'}>health</Link>
            </div>
        </div>

        {/* search input section */}

        <div>
            <Search />
        </div>
    </div>
  )
}

export default DesktopNavbar;