'use client'
import BlogCard from '@/components/blogCard/BlogCard'
import { blogs } from '@/lib/data'
import { searchPosts } from '@/services/getposts'
import { useEffect, useState } from 'react'

export async function fetchBlogs () {
  const res = await fetch('https://swim-blog.vercel.app/api/blog', {
    cache: 'no-store'
  })

  return res.json()
}

export default async function Home () {
  
  const [blogs, setBlogs] = useState([])

  //const blogs = await fetchBlogs()

  useEffect(async () => {
    try {
      const newBLogs = await searchPosts()
      setBlogs(newBLogs)
    } catch (error) {
      console.error(error)
    }
  }, [])
  



  return (
    <section className='bg-white'>
      <h1 className='text-center mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl mt-4'>
        Swimming Blog
      </h1>
      <div className='py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 grid gap-3 grid-cols-3'>
        {blogs?.length > 0 ? (
          blogs.map(blog => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h3 className=''>No blogs are currently in the</h3>
        )}
      </div>
    </section>
  )
}
