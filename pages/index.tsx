import Head from 'next/head'
import { FC } from 'react'
import Layout from '../components/layout'
import PostPreview from '../components/post-list'
import { SITE_NAME } from '../config/info'
import { getAllPosts, Field, Post } from '../lib/posts'

const Top: FC<{
  posts: Pick<Post, 'slug' | 'title' | 'content' | 'createdAt'>[]
}> = ({ posts }) => (
  <Layout>
    <Head>
      <title>{SITE_NAME}</title>
    </Head>
    {posts.map((post) => (
      <PostPreview
        key={post.slug}
        title={post.title}
        createdAt={post.createdAt}
        slug={post.slug}
      />
    ))}
  </Layout>
)

export const getStaticProps = async () => ({
  props: {
    posts: getAllPosts([
      'title',
      'createdAt',
      'updatedAt',
      'slug',
      'excerpt',
    ] as Field[]),
  },
})
export default Top
