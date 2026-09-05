export function StyleGrid({ items, className = '' }) {
  const cols = items.length === 2 ? 'style-grid--two' : 'style-grid--four'

  return (
    <div className={`style-grid ${cols} ${className}`.trim()}>
      {items.map((item) => (
        <figure key={item.label} className="style-grid__cell">
          <img src={item.src} alt={item.label} />
          <figcaption className="style-grid__label">{item.label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
