import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
const postsDirectory = join(process.cwd(), '_posts')

export interface Author {
  name: string
  picture: string
}

export interface Post {
  title: string
  slug: string
  tags: string
  createdAt: string
  updatedAt: string
  excerpt: string
  content: string
}

export type Field = keyof Post

export function getPostBySlug<T extends Field[]>(
  slug: string,
  fields: T
): Pick<Post, T[number]> {
  const fullPath = join(postsDirectory, `${slug}/index.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content, excerpt } = matter(fileContents, { excerpt: true })

  // Ensure only the minimal needed data is exposed
  return fields.reduce((items: any, field) => {
    if (field === 'slug') {
      return {
        ...items,
        slug,
      }
    }
    if (field === 'content') {
      return {
        ...items,
        content,
      }
    }
    if (field === 'excerpt') {
      return {
        ...items,
        excerpt,
      }
    }

    return {
      ...items,
      [field]: data[field],
    }
  }, {})
}

export function getAllPosts<T extends Field[]>(
  fields: T
): ReturnType<typeof getPostBySlug>[] {
  const slugs = fs.readdirSync(postsDirectory)
  console.log(slugs)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // @ts-ignore
    .sort((po1, po2) => (po1.createdAt > po2.createdAt ? -1 : 1))
  return posts
}
