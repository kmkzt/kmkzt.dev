import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { Field, Markdown } from '../interfaces/markdown'
const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug<T extends Field[]>(
  slug: string,
  fields: T
): Pick<Markdown, T[number]> {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Ensure only the minimal needed data is exposed
  return fields.reduce((items: any, field) => {
    if (field === 'slug') {
      return {
        ...items,
        slug: realSlug,
      }
    }
    if (field === 'content') {
      return {
        ...items,
        content,
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
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // @ts-ignore
    .sort((po1, po2) => (po1.date > po2.date ? -1 : 1))
  return posts
}
