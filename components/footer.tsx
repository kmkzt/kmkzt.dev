import { GITHUB_ACCOUNT } from '../lib/constants'

export default function Footer() {
  return (
    <footer>
      <a href={`https://github.com/${GITHUB_ACCOUNT}`}>View on GitHub</a>
    </footer>
  )
}
