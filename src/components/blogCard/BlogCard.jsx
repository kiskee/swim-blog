'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const ListPosts = () => {
  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {
    async function fetchBlog() {
        const res = await fetch('https://swim-blog.vercel.app/api/blog/')
        return res.json()

    }
    const list = fetchBlog()
    setBlogs(list)
}, [])
  //console.log(blogs)
return (
  <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 grid gap-3 grid-cols-3'>
        {blogs?.length > 0 ? (
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h3 className=''>No blogs are currently in the</h3>
        )}
      </div>
)
}


const BlogCard = ({blog: { title, desc, imageUrl, likes, authorId, _id }}) => {
  const isLiked = true

  


/*
<div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 grid gap-3 grid-cols-3'>
        {blogs?.length > 0 ? (
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h3 className=''>No blogs are currently in the</h3>
        )}
      </div>
*/

  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 content-center'>
      <Link href={`/blog/${_id}`} className='flex justify-center items-center mt-4'>
        <Image src={imageUrl} width="300" height="300" className=''/>
      </Link>
      <div className='p-5'>
        <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {title}
          </h5>
        </a>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
        {desc}
        </p>
        <Link
          href={`/blog/${_id}`}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Read more
          <svg
            className='w-3.5 h-3.5 ml-2'
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
        <p>{likes}</p>
      </div>
    </div>
  )
}

export default ListPosts
