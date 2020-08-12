import styled from '@emotion/styled'
import Link from 'next/link'
import { FC } from 'react'
import { Box, Heading, Text } from 'rebass'
import { ThemeProps } from '../config/theme'
import { Post } from '../models/posts'
import DateFormater from './date-formater'

const PostLink: FC<{ slug: string }> = ({ slug, children }) => (
  <Link as={`/posts/${slug}`} href="/posts/[slug]">
    <a>{children}</a>
  </Link>
)

const PostTitle = styled(Text)<ThemeProps>`
  color: ${({ theme }) => theme?.colors?.primary || '#27f'};
`
const PostList: FC<Pick<Post, 'title' | 'createdAt' | 'slug'>> = ({
  title,
  createdAt,
  slug,
}) => {
  return (
    <Box pb="12px">
      <DateFormater dateString={createdAt} />
      <Heading as="h3">
        <PostLink slug={slug}>
          <PostTitle>{title}</PostTitle>
        </PostLink>
      </Heading>
    </Box>
  )
}

export default PostList
