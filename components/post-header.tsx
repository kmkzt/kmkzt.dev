import Avatar from '../components/avatar'
import DateFormater from '../components/date-formater'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'

export default function PostHeader({ title, coverImage, date, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div>
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div>
        <CoverImage title={title} src={coverImage} />
      </div>
      <div>
        <div>
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div>
          <DateFormater dateString={date} />
        </div>
      </div>
    </>
  )
}
