import Link from 'next/link'
const PostLink = ({ slug, children }) => (
  <Link as={`/posts/${slug}`} href="/posts/[slug]">
    {children}
  </Link>
)

export default PostLink
