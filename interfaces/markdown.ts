export interface Author {
  name: string
  picture: string
}

export interface Markdown {
  title: string
  date: string
  slug: string
  excerpt: string
  author: Author
  content: string
  ogImage: string
  coverImage: string
}

export type Field = keyof Markdown
