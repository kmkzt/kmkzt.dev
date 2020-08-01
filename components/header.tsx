import Link from 'next/link'
import { BLOG_NAME } from '../lib/constants'

export default function Header() {
  return (
    <h2>
      <Link href="/">
        <a>{BLOG_NAME}</a>
      </Link>
    </h2>
  )
}
