# Contour Lash and Brow

Website for [contourlashandbrow.com.au](https://contourlashandbrow.com.au/) — lash extensions, lash lifts and brow treatments in Morley, WA.

The React app is the design preview. The same pages are also exported as **Elementor free** container templates for WordPress (ElementsKit Lite for header and footer). No Atomic builder and no Elementor Pro widgets.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home — hero slider, services, salon gallery, reviews |
| `/services` | Price list for Classic, Hybrid, Volume, lifts and brows |
| `/contact` | Salon details, hours, enquiry form, map |
| `/privacy-policy` | Privacy Policy (linked in the footer) |

**Book Now** opens the Acuity calendar: [app.acuityscheduling.com/schedule/dcffaf1c](https://app.acuityscheduling.com/schedule/dcffaf1c)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/).

```bash
npm run build    # production build
npm run preview  # preview the build
```

## Project structure

```
src/
  components/     Header, Footer, sliders, service rows
  data/           Site details, prices, gallery and reviews
  pages/          Home, Services, Contact, Privacy
public/images/    Logo, hero, service photos, reviews, Facebook gallery
templates/        Elementor JSON, assets, and WordPress importer plugin
```

Edit salon details in `src/data/site.js` and prices in `src/data/services.js`.

## WordPress / Elementor

Use **Elementor free** + **Flexbox Container** + **ElementsKit Lite**.

### Recommended: importer plugin

1. Zip is at `templates/contour-template-importer.zip`
2. WordPress → Plugins → Add New → Upload Plugin
3. Activate, then **Tools → Contour Templates → Import templates now**
4. The plugin copies images to `wp-content/uploads/contour/` and creates saved templates plus pages

### Manual import

See `templates/README.md`. In short:

1. Copy `templates/assets/` to `wp-content/uploads/contour/`
2. Elementor → Settings → Features → Flexbox Container = Active
3. Templates → Saved Templates → Import Templates
4. Import `contour-header.json` and `contour-footer.json` into ElementsKit Header / Footer (Entire Site)
5. Create pages Home, Services, Contact, Privacy Policy and insert the matching templates
6. Settings → Reading → set Home as the homepage

JSON files:

- `templates/contour-header.json`
- `templates/contour-footer.json`
- `templates/contour-home.json`
- `templates/contour-services.json`
- `templates/contour-contact.json`
- `templates/contour-privacy-policy.json`

Do **not** import JSON from the Elementor editor folder icon (Elementor 4.x shows “This source does not support import”). Use Saved Templates or the plugin.

## Salon details

- **Phone:** 0426 194 413
- **Email:** Contourlashbrowperth@gmail.com
- **Address:** 2A/15-21 Collier Rd, Morley WA 6062 (inside Australian Cosmetic Hub)
- **ABN:** 66 187 638 042
- **Hours:** Appointments only — Mon–Fri 9am–7pm, Sat 9am–5pm, Sun 10am–5pm
- **Facebook:** [Contour Lash and Brow Perth](https://www.facebook.com/people/Contour-Lash-and-Brow-Perth/61574393889689/)
- **Instagram:** [@contourlashandbrow](https://www.instagram.com/contourlashandbrow/)

## Notes

- Contact form uses `mailto` (Elementor Form is Pro-only)
- Google Maps needs an API key under Elementor → Settings → Integrations if the map is blank
- Rebuild Elementor JSON after content changes: `python templates/_build.py`
# Contour-Lash-and-Brow
