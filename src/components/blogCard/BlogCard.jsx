'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const BlogCard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://swim-blog.vercel.app/api/blog')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  /**
   <h2>{post.title}</h2>
        <p>{post.desc}</p>
        <img src={post.imageUrl} alt={post.title} />
        <p>Category: {post.category}</p>
        <p>Likes: {post.likes.length}</p>
        <p>Created At: {post.createdAt}</p>
        <p>Updated At: {post.updatedAt}</p>
   */

  return (
    <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 grid gap-3 grid-cols-3'>
    {posts.map((post) => (
      <div key={post._id} className='max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 content-center'>
        <Link
        href={`/blog/${post._id}`}
        className='flex justify-center items-center mt-4'
      >
        <Image src={post.imageUrl} width='300' height='300' className='' />
      </Link>
      <div className='p-5'>
        <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
            {post.title}
          </h5>
        </a>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          {post.desc}
        </p>
        <Link
          href={`/blog/${post._id}`}
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
        <p>{post.likes}</p>
      </div>
        
        
        
      </div>
    ))}
  </div>
  )
}


export default BlogCard
