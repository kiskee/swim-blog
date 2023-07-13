import BlogCard from '@/components/blogCard/BlogCard'
import { blogs } from '@/lib/data'
import Image from 'next/image'
import classes from './page.module.css'

export async function fetchBlogs(){
  const res = await fetch('https://swim-blog.vercel.app/api/blog', {cache: 'no-store'})

  return res.json()
}


export default async function Home() {
  const blogs = await fetchBlogs()

  return (
   <div className={classes.container}>
    <h2>SVG-NAT</h2>
     <div className={classes.wrapper}>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog}/>
      ))}
     </div>
   </div>
  )
}
