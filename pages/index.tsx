import { FC } from 'react'
import Head from 'next/head'
import PostPreview from '../components/post-list'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import { BLOG_NAME } from '../config/info'
import { Field, Md } from '../interfaces/md'

const Top: FC<{
  posts: Pick<
    Md,
    'slug' | 'title' | 'content' | 'coverImage' | 'excerpt' | 'createdAt'
  >[]
}> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.title}
          coverImage={post.coverImage}
          createdAt={post.createdAt}
          slug={post.slug}
          excerpt={post.excerpt}
        />
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => ({
  props: {
    posts: getAllPosts([
      'title',
      'createdAt',
      'updatedAt',
      'slug',
      'coverImage',
      'excerpt',
    ] as Field[]),
  },
})
export default Top
