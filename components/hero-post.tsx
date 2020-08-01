import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import PostLink from './post-link'

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
        <PostLink slug={slug}>
          <img alt={title} src={coverImage} />
        </PostLink>
      </div>
      <h3>
        <PostLink slug={slug}>
          <a>{title}</a>
        </PostLink>
      </h3>
      <DateFormater dateString={date} />
      <div>
        <p>{excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </section>
  )
}
