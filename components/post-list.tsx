import { FC } from 'react'
import { Image, Card, Text, Heading } from 'rebass'
import Link from 'next/link'
import { Md } from '../interfaces/md'
import DateFormater from './date-formater'

const PostLink = ({ slug, children }) => (
  <Link as={`/posts/${slug}`} href="/posts/[slug]">
    <a>{children}</a>
  </Link>
)

const PostList: FC<Pick<
  Md,
  'title' | 'coverImage' | 'createdAt' | 'excerpt' | 'slug'
>> = ({ title, coverImage, createdAt, excerpt, slug }) => {
  return (
    <Card>
      <PostLink slug={slug}>
        <Image alt={title} src={coverImage} />
      </PostLink>
      <Heading as="h3">
        <PostLink slug={slug}>{title}</PostLink>
      </Heading>
      <DateFormater dateString={createdAt} />
      <PostLink slug={slug}>
        <Text>{excerpt}</Text>
      </PostLink>
    </Card>
  )
}

export default PostList
