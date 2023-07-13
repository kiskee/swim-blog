export const searchPosts = async () => {
  try {
    const response = await fetch('https://swim-blog.vercel.app/api/blog')
    const json = await response.json()

    const posts = json.Search

    return posts?.map(post => ({
      title: post.title,
      desc: post.desc,
      imageUrl: post.imageUrl,
      category: post.Year,
      likes: post.likes,
      createdAt: post.createdAt
    }))
  } catch (e) {
    throw new Error('Error while loading Posts')
  }
}
