import Link from 'next/link'
import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import { Markdown } from '../interfaces/markdown'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Pick<
  Markdown,
  'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug'
>) {
  return (
    <div>
      <Link as={`/posts/${slug}`} href="/posts/[slug]">
        <img alt={title} src={coverImage} />
      </Link>
      <h3>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{title}</a>
        </Link>
      </h3>
      <DateFormater dateString={date} />
      <p>{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  )
}
