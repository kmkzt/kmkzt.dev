export interface Author {
  name: string
  picture: string
}

export interface Md {
  title: string
  slug: string
  createdAt: string
  updatedAt: string
  tags: string
  excerpt: string
  content: string
  ogImage: string
  coverImage: string
}

export type Field = keyof Md
