import PostPreview from '../components/post-preview'
import { Markdown } from '../interfaces/markdown'
export default function MoreStories({
  posts,
}: {
  posts: Pick<
    Markdown,
    'slug' | 'title' | 'coverImage' | 'date' | 'author' | 'excerpt'
  >[]
}) {
  return (
    <section>
      <h2>More Stories</h2>
      <div>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}
