export const facebookGallery = [
  { src: '/images/fb/01.jpg', alt: 'Contour Lash and Brow grand opening flyer' },
  { src: '/images/fb/02.jpg', alt: 'Before and after lash and brow treatment' },
  { src: '/images/fb/03.jpg', alt: 'Volume lash extensions close-up' },
  { src: '/images/fb/04.jpg', alt: 'Classic lash extensions close-up' },
  { src: '/images/fb/05.jpg', alt: 'Lash and brow styling close-up' },
  { src: '/images/fb/06.jpg', alt: 'Full lash set and defined brows' },
  { src: '/images/fb/07.jpg', alt: 'Volume lash extensions with mirror detail' },
  { src: '/images/fb/08.jpg', alt: 'Wispy lash extensions and shaped brows' },
  { src: '/images/fb/09.jpg', alt: 'Contour Lash and Brow client result' },
]

const g = facebookGallery.map((item) => item.src)
const svc = (name) => `/images/services/${name}.jpg`

export const styleSets = {
  classic: [
    { src: svc('classic-glamour'), label: 'Glamour Classic' },
    { src: svc('classic-natural'), label: 'Natural Classic' },
  ],
  hybrid: [
    { src: svc('hybrid-deluxe'), label: 'Deluxe Hybrid' },
    { src: svc('hybrid-natural'), label: 'Hybrid Natural' },
    { src: svc('hybrid-kimk'), label: 'Textured Kim K' },
    { src: svc('hybrid-wet'), label: 'Wispy Wet Look' },
  ],
  volume: [
    { src: svc('volume-5d'), label: 'Deluxe Volume 5D' },
    { src: svc('volume-7d'), label: 'Dramatic Volume 7D' },
    { src: svc('volume-10d'), label: 'Mega Volume 10D' },
    { src: svc('volume-3d'), label: 'Natural Volume 3D' },
  ],
  lift: [
    { src: svc('lift-01'), label: 'Lash Lift 1' },
    { src: svc('lift-02'), label: 'Lash Lift 2' },
    { src: svc('lift-03'), label: 'Lash Lift 3' },
    { src: svc('lift-04'), label: 'Lash Lift 4' },
  ],
  brow: [
    { src: svc('brow-lamination'), label: 'Brow Lamination' },
    { src: svc('brow-tint'), label: 'Brow Tint' },
    { src: svc('brow-styling'), label: 'Brow Styling' },
    { src: svc('brow-wax'), label: 'Brow Wax' },
  ],
}

export const serviceGallery = [
  { src: svc('classic-natural'), alt: 'Natural classic lash extensions' },
  { src: svc('classic-glamour'), alt: 'Glamour classic lash extensions' },
  { src: svc('hybrid-natural'), alt: 'Natural hybrid lash extensions' },
  { src: svc('hybrid-deluxe'), alt: 'Deluxe hybrid lash extensions' },
  { src: svc('hybrid-wet'), alt: 'Wispy wet look lash extensions' },
  { src: svc('hybrid-kimk'), alt: 'Textured Kim K lash extensions' },
  { src: svc('volume-3d'), alt: 'Natural volume 3D lash extensions' },
  { src: svc('volume-5d'), alt: 'Deluxe volume 5D lash extensions' },
  { src: svc('volume-7d'), alt: 'Dramatic volume 7D lash extensions' },
  { src: svc('volume-10d'), alt: 'Mega volume 10D lash extensions' },
  { src: svc('lift-01'), alt: 'Lash lift result' },
  { src: svc('lift-02'), alt: 'Lash lift and tint result' },
  { src: svc('brow-styling'), alt: 'Brow styling result' },
  { src: svc('brow-lamination'), alt: 'Brow lamination result' },
  { src: svc('brow-wax'), alt: 'Brow wax result' },
  { src: svc('brow-tint'), alt: 'Brow tint result' },
]

export const heroSlides = [
  {
    src: '/images/hero-lashes.jpg',
    alt: 'Volume eyelash extensions at Contour Lash and Brow',
  },
  {
    src: '/images/hero-brows.jpg',
    alt: 'Brow lamination and lash lift at Contour Lash and Brow',
  },
  {
    src: '/images/hero-hybrid.jpg',
    alt: 'Hybrid wispy lash extensions at Contour Lash and Brow',
  },
]

export const workPhotos = {
  hero: '/images/hero-lashes.jpg',
  welcome: g[0],
  classic: [svc('classic-natural'), svc('classic-glamour')],
  glamour: [svc('classic-glamour'), svc('classic-natural')],
  hybrid: [svc('hybrid-natural'), svc('hybrid-deluxe'), svc('hybrid-wet')],
  deluxe: [svc('hybrid-deluxe'), svc('hybrid-wet'), svc('hybrid-kimk')],
  wet: [svc('hybrid-wet'), svc('hybrid-deluxe'), svc('hybrid-kimk')],
  kimk: [svc('hybrid-kimk'), svc('hybrid-wet'), svc('hybrid-deluxe')],
  volume: [svc('volume-3d'), svc('volume-5d'), svc('volume-7d')],
  deluxeVol: [svc('volume-5d'), svc('volume-7d'), svc('volume-10d')],
  dramatic: [svc('volume-7d'), svc('volume-10d'), svc('volume-5d')],
  mega: [svc('volume-10d'), svc('volume-7d'), svc('volume-5d')],
  brows: [svc('brow-styling'), svc('brow-lamination'), svc('brow-wax'), svc('brow-tint')],
  lift: [svc('lift-01'), svc('lift-02'), svc('lift-03'), svc('lift-04')],
  browWax: [svc('brow-wax'), svc('brow-styling')],
  browTint: [svc('brow-tint'), svc('brow-styling')],
  browLamination: [svc('brow-lamination'), svc('brow-styling')],
}

export const reviewScreenshots = Array.from({ length: 20 }, (_, i) => ({
  src: `/images/reviews/review-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Client review ${i + 1}`,
}))

export const reviews = [
  {
    quote: '10/10 recommend I got my lashes done by Aaron and he did an amazing job absolutely love them.',
    source: 'Facebook review',
  },
  {
    quote:
      'I had a glamour set booked in with Aaron today. He absolutely exceeded my expectations! The best set I’ve ever had done. Aaron had amazing customer service skills and I felt comfortable and well taken care of.',
    source: 'Facebook review',
  },
]
