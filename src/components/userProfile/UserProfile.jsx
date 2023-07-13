'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Profile from '../../../public/profile.jpg'
import Link from 'next/link'

function UserProfile ({ session }) {
  return (
    <>
      <ul className='menu'>
        <li>
          <Image src={Profile} className='w-10 h-10 rounded-full' />

          <ul className='border mt-2'>
            <li className='pt-3'>
              <span className='block text-sm text-gray-900 text-center'>
                {session.user.email}
              </span>
            </li>
            <li className=' pb-2 text-center'>
              <span className='block text-sm  text-sky-500 truncate '>
                {session.user.username}
              </span>
            </li>
            <li className='pt-1'>
              <Link
                href='/create-blog'
                className='block py-2 pl-3 pr-4 rounded hover:bg-gray-100  md:p-0 '
              >
                Create Post
              </Link>
            </li>
            <li>
              <button
                className='block py-2 pl-3 pr-4 rounded hover:bg-gray-100  md:p-0 text-red-600'
                onClick={() => {
                  signOut()
                }}
              >
                Signout
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </>
  )
}

export default UserProfile
