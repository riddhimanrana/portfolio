import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { BlogPost } from '@/types/blog'

const postsDirectory = path.join(process.cwd(), 'data/blog')

export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '')

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)

      // Combine the data with the slug
      return {
        slug,
        content: matterResult.content,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        tags: matterResult.data.tags || [],
      } as BlogPost
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    
    // Combine the data with the slug
    return {
      slug,
      content: matterResult.content,
      title: matterResult.data.title || '',
      date: matterResult.data.date || '',
      excerpt: matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
    } as BlogPost
  } catch (error) {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''))
}
