import { Container, Inner, Column } from '../components/Container'
import { BookButton } from '../components/BookButton'
import { ServiceRow, TreatmentRow } from '../components/ServiceRow'
import { StyleGrid } from '../components/StyleGrid'
import { extraTreatments, lashCategories } from '../data/services'
import { styleSets } from '../data/gallery'

export function Services() {
  return (
    <>
      <Container className="section page-head" boxed>
        <Inner className="page-head-row">
          <Column className="page-head-title">
            <h1>Our Services</h1>
          </Column>
          <Column className="page-head-cta">
            <BookButton />
          </Column>
        </Inner>
        <Inner className="jump-row">
          {lashCategories.map((cat) => (
            <a key={cat.id} className="jump-link" href={`#${cat.id}`}>
              {cat.title}
            </a>
          ))}
          <a className="jump-link" href="#treatments">
            Lifts, Brows &amp; More
          </a>
        </Inner>
      </Container>

      {lashCategories.map((category) => (
        <Container key={category.id} id={category.id} className="section service-block" boxed>
          <Column className="section-heading">
            <p className="eyebrow">{category.subtitle}</p>
            <h2>{category.title}</h2>
          </Column>
          {category.styleSet ? (
            <StyleGrid items={styleSets[category.styleSet]} className="service-style-grid" />
          ) : null}
          {category.services.map((service) => (
            <ServiceRow key={service.name} service={service} />
          ))}
        </Container>
      ))}

      <Container id="treatments" className="section service-block section--blush" boxed>
        <Column className="section-heading">
          <p className="eyebrow">Add-ons &amp; extras</p>
          <h2>Lash Lifts, Brows &amp; More</h2>
        </Column>
        <Inner className="treatment-style-row">
          <Column>
            <h3>Lash Lift</h3>
            <StyleGrid items={styleSets.lift} className="service-style-grid" />
          </Column>
          <Column>
            <h3>Brow Sculpting</h3>
            <StyleGrid items={styleSets.brow} className="service-style-grid" />
          </Column>
        </Inner>
        {extraTreatments.map((treatment) => (
          <TreatmentRow key={treatment.name} treatment={treatment} />
        ))}
      </Container>
    </>
  )
}

