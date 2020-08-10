import { FC } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { Heading, Box, Text, Flex } from 'rebass'
import Markdown from '../../components/markdown'
import DateFormater from '../../components/date-formater'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../api/posts'
import { SITE_NAME } from '../../config/info'
import markdownToHtml from '../../lib/markdownToHtml'
import Loading from '../../components/loading'
import { Field, Post } from '../../api/posts'

const PostPage: FC<Pick<
  Post,
  'slug' | 'title' | 'createdAt' | 'updatedAt' | 'content'
>> = ({ slug, title, createdAt, updatedAt, content }) => {
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

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'createdAt',
    'updatedAt',
    'slug',
    'content',
  ] as Field[])
  const content = await markdownToHtml(
    post.content || '',
    `/posts/${params.slug}`
  )

  return {
    props: {
      ...post,
      content,
    },
  }
}

export async function getStaticPaths() {
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
