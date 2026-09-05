import { Link } from 'react-router-dom'
import { Container, Inner, Column } from '../components/Container'
import { BookButton } from '../components/BookButton'
import { reviewScreenshots, reviews, serviceGallery, styleSets, workPhotos, heroSlides } from '../data/gallery'
import { ReviewSlider } from '../components/ReviewSlider'
import { StyleGrid } from '../components/StyleGrid'
import { HeroSlider } from '../components/HeroSlider'
import { site } from '../data/site'

const highlights = [
  {
    title: 'Classic Lashes',
    text: 'Natural Classic and Glamour Classic — one extension on each natural lash, from a soft everyday finish to extra length and definition.',
    styles: styleSets.classic,
  },
  {
    title: 'Hybrid Lashes',
    text: 'Natural Hybrid, Deluxe Hybrid, Wispy Wet Look and Textured Kim K — classic mixed with volume fans for texture and fullness.',
    styles: styleSets.hybrid,
  },
  {
    title: 'Volume Lashes',
    text: 'Natural Volume 3D, Deluxe Volume 5D, Dramatic Volume 7D and Mega Volume 10D — lightweight fans from a soft everyday look to full glam.',
    styles: styleSets.volume,
  },
  {
    title: 'Lash Lift',
    text: 'Lash lift, and lash lift & tint with keratin — curl and define your natural lashes without extensions.',
    styles: styleSets.lift,
  },
  {
    title: 'Brow Sculpting',
    text: 'Brow wax, tint, styling and lamination to shape, fill and polish your natural brows.',
    styles: styleSets.brow,
  },
]

export function Home() {
  return (
    <>
      <section className="e-con e-con--full e-con--column hero">
        <div className="hero-media">
          <HeroSlider images={heroSlides} />
        </div>
        <div className="e-con-inner e-con-inner--column hero-content">
          <p className="eyebrow">{site.name}</p>
          <h1>{site.tagline}</h1>
          <p className="hero-lead">
            Lash extensions, lash lifts and brow treatments in Morley — located inside Australian Cosmetic Hub.
          </p>
          <Inner className="hero-actions">
            <BookButton />
            <Link className="text-link" to="/services">
              View services
            </Link>
          </Inner>
        </div>
      </section>

      <Container className="section welcome-section" boxed>
        <Inner className="welcome-row">
          <Column className="welcome-copy">
            <p className="eyebrow">Welcome</p>
            <h2>Welcome to Contour Lash and Brow</h2>
            <p>
              Welcome to Contour Lash and Brow, where we enhance your natural beauty. Our technicians use high-quality
              products and careful application to create lashes and brows that feel lightweight, look polished, and last.
            </p>
            <p>
              Whether you want a soft natural classic set or a full glam transformation, we will help you choose the
              style that suits your eye shape and everyday routine. Appointments are available seven days a week.
            </p>
            <BookButton />
          </Column>
          <Column className="welcome-image">
            <img src={workPhotos.welcome} alt="Contour Lash and Brow services and location" />
          </Column>
        </Inner>
      </Container>

      <Container className="section section--blush" boxed>
        <Column className="section-heading">
          <p className="eyebrow">Services</p>
          <h2>Look and feel your best</h2>
          <p>
            We offer classic, hybrid and volume eyelash extensions, plus lash lifts, brow wax, tint, styling and
            lamination.
          </p>
        </Column>
        <Inner className="card-row">
          {highlights.map((item) => (
            <Column key={item.title} className="feature-card">
              <StyleGrid items={item.styles} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Column>
          ))}
        </Inner>
        <Inner className="center-actions">
          <Link className="ghost-btn" to="/services">
            See full price list
          </Link>
        </Inner>
      </Container>

      <Container className="section" boxed>
        <Column className="section-heading">
          <p className="eyebrow">Our work</p>
          <h2>From the salon</h2>
        </Column>
        <Inner className="gallery-row">
          {serviceGallery.map((item) => (
            <Column key={item.src} className="gallery-card">
              <img src={item.src} alt={item.alt} />
            </Column>
          ))}
        </Inner>
      </Container>

      <Container className="section section--blush" boxed>
        <Column className="section-heading">
          <p className="eyebrow">Reviews</p>
          <h2>What clients say</h2>
        </Column>
        <ReviewSlider images={reviewScreenshots} />
        <Inner className="review-row">
          {reviews.map((item) => (
            <Column key={item.quote} className="review-card">
              <p className="review-stars">★★★★★</p>
              <p>“{item.quote}”</p>
              <p className="review-source">{item.source}</p>
            </Column>
          ))}
        </Inner>
      </Container>

      <Container className="section" boxed>
        <Inner className="info-row">
          <Column>
            <p className="eyebrow">What to expect</p>
            <h2>What are eyelash extensions?</h2>
            <p>
              Eyelash extensions are semi-permanent lashes applied to each natural lash individually for the most
              natural-looking result. Unlike strip lashes, a professional lash stylist attaches one extension to each of
              your natural lashes.
            </p>
            <p>
              A full set takes around 1 to 2 hours depending on the style you choose. Refills are generally 1 to 1.5
              hours every 2–4 weeks to keep your set looking fresh.
            </p>
          </Column>
          <Column>
            <p className="eyebrow">Before you visit</p>
            <h2>Preparation</h2>
            <p>Please remove all eye make-up before your appointment so we can use the full treatment time on your lashes.</p>
            <p>
              Contact lenses cannot be worn during treatment, as your eyes stay closed while extensions are applied.
              Avoid waterproof mascara for at least 3 days prior — it can be very difficult to remove.
            </p>
          </Column>
        </Inner>
      </Container>

      <Container className="section section--dark cta-banner" boxed={false}>
        <div className="e-con-inner e-con-inner--column cta-inner">
          <h2>Appointments available</h2>
          <p>Book online with live availability — {site.hoursNote.toLowerCase()}.</p>
          <BookButton className="book-btn--light" />
        </div>
      </Container>
    </>
  )
}
