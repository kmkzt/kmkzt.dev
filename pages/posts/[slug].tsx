import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Heading, Box, Text, Flex } from 'rebass'
import { getPostBySlug, getAllPosts, Field, Post } from '../../api/posts'
import DateFormater from '../../components/date-formater'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import Markdown from '../../components/markdown'
import { SITE_NAME } from '../../config/info'
import markdownToHtml from '../../lib/markdownToHtml'

type PageProps = Pick<
  Post,
  'slug' | 'title' | 'createdAt' | 'updatedAt' | 'content'
>

interface PageParams extends ParsedUrlQuery {
  slug: string
}

const PostPage: FC<PageProps> = ({
  slug,
  title,
  createdAt,
  updatedAt,
  content,
}) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  if (router.isFallback) {
    return (
      <Layout>
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout>
      <article>
        <Head>
          <title>
            {title} | {SITE_NAME}
          </title>
          {/* <meta property="og:image" content={ogImage} /> */}
        </Head>
        <Box>
          <Heading as="h1">{title}</Heading>
          <Flex>
            <Text mr={2}>
              公開日: <DateFormater dateString={createdAt} />
            </Text>
            <Text>
              更新日: <DateFormater dateString={updatedAt} />
            </Text>
          </Flex>
        </Box>
        <Markdown content={content} />
      </article>
    </Layout>
  )
}

export async function getStaticProps({
  params,
}: {
  params: PageParams
}): Promise<{ props: PageProps }> {
  const info = getPostBySlug(params.slug, [
    'title',
    'createdAt',
    'updatedAt',
    'slug',
    'content',
  ] as Field[])
  const content = await markdownToHtml(
    info.content || '',
    `/posts/${params.slug}`
  )

  return {
    props: {
      ...info,
      content,
    },
  }
}

export const getStaticPaths: GetStaticPaths<PageParams> = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export default PostPage
