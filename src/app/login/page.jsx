'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async e => {
    e.preventDefault()

    if (password === '' || email === '') {
      toast.error('Fill all fields!')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false
      })

      if (res?.error == null) {
        router.push('/')
      } else {
        toast.error('Error occured while logging')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='justify-center h-[calc(100vh-4rem)] flex items-center text-center'>
      <form
        onSubmit={handleSubmit}
        className='px-8 py-10 w-3/12 rounded-lg border-2 border-green-500 hover:border-black shadow-2xl shadow-slate-950'
        id='signin'
      >
        <h1 className='text-4xl font-bold mb-7'>Login</h1>

        <label className='text-black'>Email:</label>
        <input
          type='email'
          placeholder='Email'
          className='bg-white text-black px-4 py-2 block mb-2 w-full'
          name='email'
          onChange={e => setEmail(e.target.value)}
        />

        <label className='text-black'>Password:</label>
        <input
          type='password'
          placeholder='Password'
          className='bg-white text-black px-4 py-2 block mb-2 w-full'
          name='password'
          onChange={e => setPassword(e.target.value)}
        />

        <button className='bg-green-500 text-white px-4 py-2 block w-full mt-4'>
          Signin
        </button>

        <Link
          href='/register'
          className='bg-blue-500 text-white px-4 py-2 block w-full mt-4'
        >
          Register
        </Link>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
