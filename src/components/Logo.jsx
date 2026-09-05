import { Link } from 'react-router-dom'
import { site } from '../data/site'

export function Logo({ className = 'site-logo' }) {
  return (
    <Link to="/" className={className} aria-label={site.name}>
      <img src="/images/logo.png" alt={site.name} />
    </Link>
  )
}
