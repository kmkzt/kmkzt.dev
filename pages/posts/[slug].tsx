import { ParsedUrlQuery } from 'querystring'
import { GetStaticPaths } from 'next'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Heading, Box, Text, Flex } from 'rebass'
import { SITE_NAME, TWITTER_ACCOUNT, SITE_URL } from '../../blog-info'
import DateFormater from '../../components/date-formater'
import Layout from '../../components/layout'
import Loading from '../../components/loading'
import Markdown from '../../components/markdown'
import markdownToHtml from '../../lib/markdownToHtml'
import { getPostBySlug, getAllPosts, Field, Post } from '../../lib/posts'

type PageProps = Pick<
  Post,
  'slug' | 'title' | 'createdAt' | 'updatedAt' | 'content' | 'excerpt'
>

interface PageParams extends ParsedUrlQuery {
  slug: string
}

const PostPage: FC<PageProps> = ({
  slug,
  title,
  excerpt,
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

  const pageUrl = SITE_URL + '/posts/' + slug

  return (
    <Layout>
      <article>
        <Head>
          <title>
            {title} | {SITE_NAME}
          </title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={excerpt ?? ''} />
          <meta property="og:url" content={pageUrl} />
          {/* TODO: ogp.pngの文字化け修正。vercel上だと文字化けする。
          <meta property="og:image" content={pageUrl + '/ogp.png'} /> */}
          <meta name="twitter:site" content={`@${TWITTER_ACCOUNT}`} />
          <meta name="twitter:card" content="summary_large_image" />
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
