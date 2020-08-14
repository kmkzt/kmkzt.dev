import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { POSTS_DIRECTORY } from '../blog-info'

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
  const fullPath = join(POSTS_DIRECTORY, `${slug}/index.md`)
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
  const slugs = fs.readdirSync(POSTS_DIRECTORY)
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // @ts-ignore
    .sort((po1, po2) => (po1.createdAt > po2.createdAt ? -1 : 1))
  return posts
}
