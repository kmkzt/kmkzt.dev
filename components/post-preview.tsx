import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import { Markdown } from '../interfaces/markdown'
import PostLink from './post-link'

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
      <PostLink slug={slug}>
        <img alt={title} src={coverImage} />
      </PostLink>
      <h3>
        <PostLink slug={slug}>
          <a>{title}</a>
        </PostLink>
      </h3>
      <DateFormater dateString={date} />
      <p>{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  )
}
