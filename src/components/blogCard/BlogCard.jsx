'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const BlogCard = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://swim-blog.vercel.app/api/blog')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) setPosts(data)

        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (posts.length === 0) {
    return <p>No posts found.</p>
  }


  return (
    <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 grid gap-3 grid-cols-3'>
      {posts.map(post => (
        <div
          key={post._id}
          className='max-w-sm rounded-lg border border-gray-200 bg-white shadow m-4 hover:bg-slate-100 shadow-lg hover:shadow-sky-500 content-between'
        >
          <Link
            href={`/blog/${post._id}`}
            className='flex justify-center items-center'
          >
            <Image src={post.imageUrl} width='400' height='300' className='rounded-t-lg' />
          </Link>
          <div class='p-5 content-between'>
            <a href='#'>
              <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
              {post.title}
              </h5>
            </a>
            <p class='mb-3 font-normal text-gray-700'>
            {post.desc.charAt(0).toUpperCase()+post.desc.slice(1).substr(0,150)}
            </p>
            <div class='flex justify-around'>
              <Link
                href={`/blog/${post._id}`}
                class='inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300'
              >
                Read more
                <svg
                  class='ml-2 h-3.5 w-3.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </Link>
              <div class='flex items-center ml-4'>
                <svg
                  class='w-4 h-4 text-yellow-300 mr-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 22 20'
                >
                  <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                </svg>
                <p class='ml-2 text-sm font-bold text-gray-900'>{post.likes.length}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogCard
