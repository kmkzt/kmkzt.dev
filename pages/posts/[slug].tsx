import { FC } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import { Heading, Image, Box, Text } from 'rebass'
import Markdown from '../../components/markdown'
import DateFormater from '../../components/date-formater'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import { BLOG_NAME } from '../../config/info'
import markdownToHtml from '../../lib/markdownToHtml'
import Loading from '../../components/loading'
import { Field, Md } from '../../interfaces/md'

const Post: FC<Pick<
  Md,
  | 'slug'
  | 'title'
  | 'createdAt'
  | 'updatedAt'
  | 'content'
  | 'coverImage'
  | 'ogImage'
>> = ({ slug, title, createdAt, updatedAt, content, ogImage, coverImage }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout>
      {router.isFallback ? (
        <Loading />
      ) : (
        <>
          <article>
            <Head>
              <title>
                {title} | {BLOG_NAME}
              </title>
              <meta property="og:image" content={ogImage} />
            </Head>
            <Box>
              <Heading as="h1">{title}</Heading>
              <Text>
                公開日: <DateFormater dateString={createdAt} />
              </Text>
              <Text>
                更新日: <DateFormater dateString={updatedAt} />
              </Text>
              <Image alt={title} src={coverImage} />
            </Box>
            <Markdown content={content} />
          </article>
        </>
      )}
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
    'ogImage',
    'coverImage',
  ] as Field[])
  const content = await markdownToHtml(post.content || '')

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

export default Post
