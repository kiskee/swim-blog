'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log([email, password, username])
    if (username === '' || email === '' || password === '') {
      toast.error('Fill all fields')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    try {
      const res = await fetch('https://swim-blog.vercel.app/api/register', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      })

      console.log(await res.json())
      if (res.ok) {
        toast.success('Successfully registered the user')
        setTimeout(() => {
          signIn()
        }, 1500)
        return
      } else {
        toast.error('Error occured while registering')
        return
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center text-center text-white'>
      <form
        onSubmit={handleSubmit}
        className='bg-neutral-950 px-8 py-10 w-3/12 rounded-lg border-2 border-blue-600 shadow-2xl shadow-purple-400'
      >
        <h1 className='text-4xl font-bold mb-7'>User Register</h1>

        <label className='text-slate-300'>Fullname:</label>
        <input
          type='text'
          className='mt-1 block text-slate-400 w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        invalid:border-pink-500 invalid:text-pink-600
        focus:invalid:border-pink-500 focus:invalid:ring-pink-500'
          placeholder='Full Name'
          name='fullname'
          onChange={e => setUsername(e.target.value)}
        />

        <label className='text-slate-300'>Email:</label>

        <input
          type='email'
          name='email'
          id='email'
          className='px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 
            disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 
            block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500
             focus:invalid:ring-pink-500 disabled:shadow-none'
          placeholder='Email'
          onChange={e => setEmail(e.target.value)}
        />

        <label className='text-slate-300'>Password:</label>

        <input
          type='password'
          name='password'
          id='password'
          className='px-3 py-2 bg-white text-slate-400 border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 
          disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1
           invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none'
          placeholder='Password'
          onChange={e => setPassword(e.target.value)}
        />

        <button className='bg-blue-500 text-white px-4 py-2 block w-full mt-4'>
          Register
        </button>

        <Link
          href='/login'
          className='bg-green-500 text-white px-4 py-2 block w-full mt-4'
        >
          Login
        </Link>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Register
