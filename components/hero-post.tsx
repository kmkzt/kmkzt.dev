import Link from 'next/link'
import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <img alt={title} src={coverImage} />
        </Link>
      </div>
      <div>
        <div>
          <h3>
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a>{title}</a>
            </Link>
          </h3>
          <div>
            <DateFormater dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  )
}
