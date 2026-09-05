import { useState, useEffect, useCallback } from 'react'

export function ReviewSlider({ images }) {
  const [idx, setIdx] = useState(0)
  const total = images.length

  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    const id = setInterval(next, 4000)
    return () => clearInterval(id)
  }, [next])

  return (
    <div className="review-slider">
      <button className="review-slider__btn review-slider__btn--prev" onClick={prev} aria-label="Previous review">
        ‹
      </button>

      <div className="review-slider__track">
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className={`review-slider__slide ${i === idx ? 'is-active' : ''}`}
          />
        ))}
      </div>

      <button className="review-slider__btn review-slider__btn--next" onClick={next} aria-label="Next review">
        ›
      </button>

      <div className="review-slider__dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`review-slider__dot ${i === idx ? 'is-active' : ''}`}
            onClick={() => setIdx(i)}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
