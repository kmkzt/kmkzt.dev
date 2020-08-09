import { FC } from 'react'
import { Box, Heading } from 'rebass'
import Link from 'next/link'
import { Post } from '../api/posts'
import DateFormater from './date-formater'

const PostLink = ({ slug, children }) => (
  <Link as={`/posts/${slug}`} href="/posts/[slug]">
    <a>{children}</a>
  </Link>
)

const PostList: FC<Pick<Post, 'title' | 'createdAt' | 'slug'>> = ({
  title,
  createdAt,
  slug,
}) => {
  return (
    <Box>
      <Heading as="h3">
        <PostLink slug={slug}>{title}</PostLink>
      </Heading>
      <DateFormater dateString={createdAt} />
    </Box>
  )
}

export default PostList
