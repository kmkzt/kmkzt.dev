import { Text } from 'rebass'
import { parseISO, format } from 'date-fns'
import { FC } from 'react'

const DateFormater: FC<{ dateString: string }> = ({ dateString }) => (
  <Text as="time" dateTime={dateString}>
    {
      // format(date, 'LLLL	d, yyyy')
      format(parseISO(dateString), 'yyyy年MM月d日hh時')
    }
  </Text>
)

export default DateFormater
