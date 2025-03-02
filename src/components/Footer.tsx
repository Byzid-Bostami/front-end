import React from 'react'
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitterSquare } from "react-icons/fa";



const Footer = () => {
  return (
    <div className='bg-teal-950 py-9 '>
        <div className='container mx-auto px-4 md:px-8 flex flex-col space-y-7 items-center lg:px-12'>
            <div className='flex flex-col items-center space-y-4'>
                <Link className='text-white font-bold capitalize text-3xl md:text-4xl' href={'/'}>Dotblog.com</Link>
                <div className='text-stone-300 uppercase font-semibold space-x-4 md:space-x-5'>
                <Link href={'/'}>Home</Link>
                <Link href={'/feature'}>Feature</Link>
                <Link href={'/news'}>News</Link>
                <Link href={'/tech'}>tech</Link>
                <Link href={'/health'}>health</Link>
                </div>
                <div className='flex space-x-4 items-center text-emerald-400 text-3xl'>
                    <button><FaTwitterSquare /></button>
                    <button><FaFacebook /></button>
                    <button><FaInstagram /></button>
                </div>
            </div>
            <p className='text-white font-semibold text-lg capitalize flex flex-col md:flex-row items-center'>All Copyright &copy; reserved by <span>❤️ Byzid Bostami</span></p>
        </div>
    </div>
  )
}

export default Footer;