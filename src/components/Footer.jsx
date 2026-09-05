import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { Logo } from './Logo'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 8.5V6.8c0-.7.5-1.1 1.2-1.1H17V3.5h-2.1C12.6 3.5 11 5 11 7.2v1.3H9v2.4h2V20.5h3.5v-9.6h2.3l.4-2.4h-2.7z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.4" cy="7.6" r="0.9" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.04 3.5A8.45 8.45 0 0 0 3.6 11.9c0 1.48.39 2.92 1.13 4.2L3.5 20.5l4.52-1.18A8.46 8.46 0 0 0 12.04 20.4 8.45 8.45 0 0 0 20.5 11.9 8.45 8.45 0 0 0 12.04 3.5zm0 15.48a7 7 0 0 1-3.57-.98l-.26-.15-2.68.7.72-2.61-.17-.27a6.97 6.97 0 0 1-1.07-3.77 7.03 7.03 0 0 1 12.06-4.97 7.03 7.03 0 0 1-4.03 12.05zm3.84-5.25c-.21-.1-1.24-.61-1.43-.68-.19-.07-.33-.1-.47.1-.14.21-.54.68-.66.82-.12.14-.24.16-.45.05-.21-.1-.88-.32-1.68-1.03-.62-.55-1.04-1.23-1.16-1.44-.12-.21-.01-.32.09-.42.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.47-1.13-.64-1.55-.17-.41-.34-.35-.47-.36h-.4c-.14 0-.36.05-.55.26-.19.21-.72.7-.72 1.71s.74 1.98.84 2.12c.1.14 1.45 2.21 3.51 3.1.49.21.87.34 1.17.43.49.16.94.13 1.29.08.39-.06 1.24-.51 1.41-1 .18-.49.18-.91.12-1-.05-.08-.19-.14-.4-.24z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5v5l3.2 1.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s6.2-5.4 6.2-10.1A6.2 6.2 0 0 0 12 4.7a6.2 6.2 0 0 0-6.2 6.2C5.8 15.6 12 21 12 21z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="10.8" r="1.8" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M7.2 3.8c.4-.4 1-.5 1.5-.3l2.2 1c.5.2.8.7.8 1.2v2.1c0 .4-.2.8-.5 1.1L9.8 10.3c.8 1.6 2.1 2.9 3.7 3.7l1.4-1.4c.3-.3.7-.5 1.1-.5h2.1c.5 0 1 .3 1.2.8l1 2.2c.2.5.1 1.1-.3 1.5l-1.1 1.1c-.4.4-1 .6-1.6.5-3.7-.5-7.2-2.4-9.8-5S4.5 7.5 4 3.8c-.1-.6.1-1.2.5-1.6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.8" y="5.8" width="16.4" height="12.4" rx="1.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.4 7.2 12 13.1l7.6-5.9" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

const hourGroups = [
  { day: 'Mon – Fri', time: '9am – 7pm' },
  { day: 'Saturday', time: '9am – 5pm' },
  { day: 'Sunday', time: '10am – 5pm' },
]

export function Footer() {
  return (
    <footer className="e-con e-con--full e-con--column site-footer">
      <div className="e-con-inner e-con-inner--column footer-inner">
        <Logo className="footer-logo" />
        <p className="footer-tagline">{site.hoursNote}</p>

        <div className="e-con e-con--nested e-con--row footer-cards">
          <section className="footer-card">
            <h3>
              <ClockIcon />
              Opening Hours
            </h3>
            <ul className="footer-hours">
              {hourGroups.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="footer-card">
            <h3>
              <PinIcon />
              Contact &amp; Location
            </h3>
            <ul className="footer-contact">
              <li>
                <PhoneIcon />
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <MailIcon />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <PinIcon />
                <span>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {site.address}
                  </a>
                  <small>{site.addressNote.replace('Located inside', 'Inside')}</small>
                </span>
              </li>
            </ul>
          </section>
        </div>

        <div className="social-row">
          <a className="social-icon" href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a className="social-icon" href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a className="social-icon" href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <WhatsappIcon />
          </a>
        </div>

        <div className="footer-legal">
          <p>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-dot" aria-hidden="true">
              •
            </span>
            <span>
              ABN <em>{site.abn}</em>
            </span>
          </p>
          <p>© {new Date().getFullYear()} Contour Lash &amp; Brow</p>
          <p>Designed &amp; Developed by Weblyst</p>
        </div>
      </div>
    </footer>
  )
}
