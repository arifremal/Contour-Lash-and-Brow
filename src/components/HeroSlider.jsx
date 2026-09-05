import { useCallback, useEffect, useState } from 'react'

export function HeroSlider({ images, interval = 5000 }) {
  const [idx, setIdx] = useState(0)
  const total = images.length

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [next, interval])

  return (
    <div className="hero-slider">
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={`hero-slider__slide ${i === idx ? 'is-active' : ''}`}
        />
      ))}

      <button type="button" className="hero-slider__btn hero-slider__btn--prev" onClick={prev} aria-label="Previous image">
        ‹
      </button>
      <button type="button" className="hero-slider__btn hero-slider__btn--next" onClick={next} aria-label="Next image">
        ›
      </button>

      <div className="hero-slider__dots">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-slider__dot ${i === idx ? 'is-active' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
