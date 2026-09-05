import { site } from '../data/site'

export function BookButton({ className = '', children = 'Book Now' }) {
  return (
    <a
      className={`book-btn ${className}`.trim()}
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
