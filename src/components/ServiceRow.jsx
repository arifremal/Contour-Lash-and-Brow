import { useState } from 'react'
import { Column, Inner } from './Container'

function Gallery({ images, name }) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1))
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1))

  return (
    <div className="service-gallery">
      {total > 1 ? (
        <button type="button" className="gallery-arrow gallery-arrow--prev" onClick={prev} aria-label="Previous image">
          ‹
        </button>
      ) : null}
      <img src={images[index]} alt={`${name} example ${index + 1}`} />
      {total > 1 ? (
        <button type="button" className="gallery-arrow gallery-arrow--next" onClick={next} aria-label="Next image">
          ›
        </button>
      ) : null}
    </div>
  )
}

export function ServiceRow({ service }) {
  return (
    <Inner className="service-row">
      <Column className="service-media">
        <Gallery images={service.images} name={service.name} />
      </Column>
      <Column className="service-copy">
        <h3>{service.name}</h3>
        <p className="service-meta">
          {service.duration}
          {service.note ? ` · ${service.note}` : ''}
        </p>
        <p>{service.description}</p>
      </Column>
      <Column className="service-prices">
        {service.prices.map((item) => (
          <p key={item.label}>
            {item.label}: ${item.price}
          </p>
        ))}
      </Column>
    </Inner>
  )
}

export function TreatmentRow({ treatment }) {
  return (
    <Inner className="service-row service-row--compact">
      <Column className="service-media">
        <Gallery images={treatment.images} name={treatment.name} />
      </Column>
      <Column className="service-copy">
        <h3>{treatment.name}</h3>
        {treatment.description ? <p>{treatment.description}</p> : null}
      </Column>
      <Column className="service-prices">
        <p>${treatment.price}</p>
      </Column>
    </Inner>
  )
}
