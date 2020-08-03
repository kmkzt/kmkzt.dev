import { parseISO, format } from 'date-fns'

export default function DateFormater({ dateString }) {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString}>
      {
        // format(date, 'LLLL	d, yyyy')
        format(date, 'yyyy年MM月d日 hh時')
      }
    </time>
  )
}
