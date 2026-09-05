import { useState } from 'react'
import { Container, Inner, Column } from '../components/Container'
import { BookButton } from '../components/BookButton'
import { site } from '../data/site'

export function Contact() {
  const [sent, setSent] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const email = data.get('email')
    const phone = data.get('phone')
    const message = data.get('message')
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Website enquiry')}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <Container className="section page-head" boxed>
        <Column className="section-heading">
          <p className="eyebrow">Get in touch</p>
          <h1>Contact Us</h1>
          <p>Questions about a lash style, a refill, or your first visit? Send us a message or book online.</p>
        </Column>
      </Container>

      <Container className="section" boxed>
        <Inner className="contact-row">
          <Column className="contact-details">
            <h2>Salon details</h2>
            <p>
              <strong>Location</strong>
              <br />
              {site.address}
              <br />
              {site.addressNote}
            </p>
            <p>
              <strong>Phone</strong>
              <br />
              <a href={site.phoneHref}>{site.phone}</a>
            </p>
            <p>
              <strong>Email</strong>
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <strong>Opening hours</strong>
              <br />
              {site.hoursNote}
            </p>
            <ul className="hours-list">
              {site.hours.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
            <BookButton />
          </Column>

          <Column className="contact-form-wrap">
            <h2>Send a message</h2>
            {sent ? (
              <p className="form-thanks">Your email app should open with the message ready to send. We will reply as soon as we can.</p>
            ) : (
              <form className="contact-form" onSubmit={onSubmit}>
                <label>
                  Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" />
                </label>
                <label>
                  Message
                  <textarea name="message" rows="5" required />
                </label>
                <button type="submit" className="book-btn">
                  Send message
                </button>
              </form>
            )}
          </Column>
        </Inner>
      </Container>

      <Container className="section map-section" boxed={false}>
        <div className="e-con-inner map-frame">
          <iframe
            title="Contour Lash and Brow location"
            src={site.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </Container>
    </>
  )
}
