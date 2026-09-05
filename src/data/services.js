import { workPhotos } from './gallery'

const img = {
  classic: workPhotos.classic,
  glamour: workPhotos.glamour,
  hybrid: workPhotos.hybrid,
  deluxe: workPhotos.deluxe,
  wet: workPhotos.wet,
  kimk: workPhotos.kimk,
  volume: workPhotos.volume,
  deluxeVol: workPhotos.deluxeVol,
  dramatic: workPhotos.dramatic,
  mega: workPhotos.mega,
}

export const lashCategories = [
  {
    id: 'classic',
    title: 'Classic Lashes',
    subtitle: '1 lash attached on 1 natural lash',
    styleSet: 'classic',
    services: [
      {
        name: 'Natural Classic',
        duration: '60 mins',
        note: '+$10 add on cashmere',
        description:
          'Enhance your eyes with a delicate and elegant set of lashes for a fresh, natural appearance. Around 60–70 extensions per eye are applied to create a soft, lightweight look.',
        images: img.classic,
        prices: [
          { label: 'Full set', price: 95 },
          { label: '2 week Refill', price: 65 },
          { label: '3 week Refill', price: 75 },
        ],
      },
      {
        name: 'Glamour Classic',
        duration: '75 mins',
        note: '+$10 add on cashmere',
        description:
          'Individual lash extensions are carefully applied to each natural lash to create added length, fullness, and curl. This service lashes up to 90% of healthy, mature natural lashes, creating the perfect balance between natural and defined.',
        images: img.glamour,
        prices: [
          { label: 'Full set', price: 115 },
          { label: '2 week Refill', price: 80 },
          { label: '3 week Refill', price: 90 },
        ],
      },
    ],
  },
  {
    id: 'hybrid',
    title: 'Hybrid Lashes',
    subtitle: 'Mixed between Classic & Volume Lashes',
    styleSet: 'hybrid',
    services: [
      {
        name: 'Natural Hybrid',
        duration: '90 mins',
        note: '+$10 add on cashmere',
        description:
          'A beautiful mix of classic and volume lashes for the perfect balance of definition and softness. Using individual lashes and lightweight 3D fans, this set creates a textured, fluffy, and naturally fuller look with effortless elegance.',
        images: img.hybrid,
        prices: [
          { label: 'Full set', price: 135 },
          { label: '2 week Refill', price: 90 },
          { label: '3 week Refill', price: 105 },
        ],
      },
      {
        name: 'Deluxe Hybrid',
        duration: '90 mins',
        description:
          'A fuller, more glamorous hybrid set that combines classic lashes with 5D volume fans. This technique creates a soft yet dense finish, adding beautiful fullness, texture, and depth while still keeping a lightweight and fluttery feel.',
        images: img.deluxe,
        prices: [
          { label: 'Full set', price: 155 },
          { label: '2 week Refill', price: 100 },
          { label: '3 week Refill', price: 115 },
          { label: '4 week Refill', price: 135 },
        ],
      },
      {
        name: 'Wispy Wet Look',
        duration: '90 mins',
        description:
          'A textured, modern lash style that creates a soft “wet mascara” effect with added wispy definition. This set is achieved using narrow closed volume fans (4–5D), where 4–5 lightweight lash fibres are placed closely together and applied to each natural lash.',
        images: img.wet,
        prices: [
          { label: 'Full set', price: 155 },
          { label: '2 week Refill', price: 100 },
          { label: '3 week Refill', price: 115 },
          { label: '4 week Refill', price: 135 },
        ],
      },
      {
        name: 'Textured Kim K',
        duration: '105 mins',
        description:
          'A wispy, spiky lash style inspired by a strip-lash look. It combines 7D volume fans and longer spikes in mixed lengths to create a bold, textured, and glamorous finish with beautiful definition and dimension.',
        images: img.kimk,
        prices: [
          { label: 'Full set', price: 185 },
          { label: '2 week Refill', price: 120 },
          { label: '3 week Refill', price: 135 },
          { label: '4 week Refill', price: 155 },
        ],
      },
    ],
  },
  {
    id: 'volume',
    title: 'Volume Lashes',
    subtitle: 'Lightweight fans for a fuller finish',
    styleSet: 'volume',
    services: [
      {
        name: 'Natural Volume 3D',
        duration: '90 mins',
        description:
          'Created by applying 3 lightweight lash fibres per natural lash to form a soft fan. This set gives a natural, light, and softly enhanced fullness, perfect for an everyday elegant look.',
        images: img.volume,
        prices: [
          { label: 'Full set', price: 135 },
          { label: '2 week Refill', price: 90 },
          { label: '3 week Refill', price: 105 },
        ],
      },
      {
        name: 'Deluxe Volume 5D',
        duration: '90 mins',
        description:
          'Using 5 lash fibres per natural lash to create fuller fans. It delivers a noticeably bolder, fluffier, and more glamorous look while still maintaining softness.',
        images: img.deluxeVol,
        prices: [
          { label: 'Full set', price: 155 },
          { label: '2 week Refill', price: 100 },
          { label: '3 week Refill', price: 115 },
          { label: '4 week Refill', price: 135 },
        ],
      },
      {
        name: 'Dramatic Volume 7D',
        duration: '90 mins',
        description:
          'Applies 7 ultra-fine lash fibres per natural lash for a denser, more defined fan. This set gives a dramatic, full, and luxurious appearance with strong volume and depth.',
        images: img.dramatic,
        prices: [
          { label: 'Full set', price: 175 },
          { label: '2 week Refill', price: 115 },
          { label: '3 week Refill', price: 130 },
          { label: '4 week Refill', price: 150 },
        ],
      },
      {
        name: 'Mega Volume 10D',
        duration: '105 mins',
        description:
          'Created with 10 ultra-fine lash fibres per natural lash, forming a dense, ultra-full fan. This style provides an intense, dark, and high-impact dramatic look for maximum volume and definition.',
        images: img.mega,
        prices: [
          { label: 'Full set', price: 205 },
          { label: '2 week Refill', price: 130 },
          { label: '3 week Refill', price: 145 },
          { label: '4 week Refill', price: 165 },
        ],
      },
    ],
  },
]

export const extraTreatments = [
  {
    name: 'Lash Lift',
    price: 75,
    description: 'Lift and curl your natural lashes for a wide-awake look that lasts several weeks — no extensions needed.',
    images: workPhotos.lift,
  },
  {
    name: 'Lash Lift & Tint + Keratine',
    price: 90,
    description: 'Lash lift with a tint and keratin treatment to darken, nourish and define your natural lashes.',
    images: workPhotos.lift,
  },
  {
    name: 'Lash Tint',
    price: 25,
    description: 'A gentle tint that darkens your natural lashes for extra definition without mascara.',
    images: workPhotos.lift,
  },
  {
    name: 'Brow Wax',
    price: 25,
    description: 'Clean, shaped brows with a precise wax to tidy the arch and highlight your natural brow line.',
    images: workPhotos.browWax,
  },
  {
    name: 'Brow Tint',
    price: 30,
    description: 'Tint fills sparse areas and adds depth so brows look fuller and more defined.',
    images: workPhotos.browTint,
  },
  {
    name: 'Brow Wax & Tint',
    price: 50,
    description: 'Shape and colour in one visit for neat, filled-in brows that frame the eyes.',
    images: workPhotos.brows,
  },
  {
    name: 'Brow Lamination (with wax and tint)',
    price: 90,
    description: 'Brow lamination with wax and tint to brush hairs into place, fill gaps and create a soft laminated finish.',
    images: workPhotos.browLamination,
  },
  {
    name: 'Makeup Removal',
    price: 15,
    description: 'Gentle eye make-up removal before a lash or brow treatment so we can use the full appointment time.',
    images: workPhotos.lift,
  },
  {
    name: 'Lash Extensions Removal (per 15 mins)',
    price: 20,
    description: 'Safe professional removal of existing extensions. Charged per 15 minutes depending on the amount to remove.',
    images: workPhotos.classic,
  },
  {
    name: 'Patch Test',
    price: 15,
    description: 'Recommended before your first lash or tint service, especially if you have sensitive eyes or known allergies.',
    images: workPhotos.brows,
  },
]
