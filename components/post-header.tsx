import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import PostTitle from '../components/post-title'
import { Markdown } from '../interfaces/markdown'

export default function PostHeader({
  title,
  coverImage,
  date,
  author,
}: Pick<Markdown, 'title' | 'coverImage' | 'date' | 'author'>) {
  return (
    <div>
      <PostTitle>{title}</PostTitle>
      <Avatar name={author.name} picture={author.picture} />
      <DateFormater dateString={date} />
      <img alt={title} src={coverImage} />
    </div>
  )
}
