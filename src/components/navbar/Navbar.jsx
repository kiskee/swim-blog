'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../../../public/login.png'

import { useSession } from 'next-auth/react'

import UserProfile from '../userProfile/UserProfile'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <nav className='border-b border-gray-200 p-4'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link href='/' className='flex items-center'>
          <Image
            src={Logo}
            width={100}
            height={50}
            alt='Picture of the author'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            SVG-SWIM
          </span>
        </Link>
        <div className='flex md:order-2'>
          {session?.user ? (
            <UserProfile session={session} />
          ) : (
            <Link
              href='/login'
              className='text-white bg-blue-700 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Signin
            </Link>
          )}
        </div>
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-sticky'
        >
          <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  text-black'>
            <li>
              <a
                href='/'
                className='block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0'
                aria-current='page'
              >
                Home
              </a>
            </li>
            <li>
              <Link
                href='/about'
                className='block py-2 pl-3 pr-4 rounded hover:bg-gray-100  md:p-0'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href='/blog'
                className='block py-2 pl-3 pr-4 rounded hover:bg-gray-100  md:p-0'
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href='/contact'
                className='block py-2 pl-3 pr-4 rounded hover:bg-gray-100  md:p-0'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
