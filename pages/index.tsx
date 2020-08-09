import { FC } from 'react'
import Head from 'next/head'
import PostPreview from '../components/post-list'
import Layout from '../components/layout'
import { getAllPosts } from '../api/posts'
import { BLOG_NAME } from '../config/info'
import { Field, Post } from '../api/posts'

const Top: FC<{
  posts: Pick<Post, 'slug' | 'title' | 'content' | 'createdAt'>[]
}> = ({ posts }) => (
  <Layout>
    <Head>
      <title>{BLOG_NAME}</title>
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
