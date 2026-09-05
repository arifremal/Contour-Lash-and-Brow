# Contour Elementor templates

Built for **Elementor free 4.2.x** + **ElementsKit Lite** using **Container layout only** (no Atomic widgets, no Elementor Pro Theme Builder types).

## 1. Upload images first

Copy everything in `templates/assets/` to:

`wp-content/uploads/contour/`

Files:

- `logo.png`
- `fb-01.jpg` … `fb-09.jpg`

Image URLs in the JSON files point to:

`https://contourlashandbrow.com.au/wp-content/uploads/contour/...`

If your uploads path is different, do a find/replace in the JSON files before import.

## 2. Enable containers

Elementor → Settings → Features → **Flexbox Container** = Active.

## 3. Import templates

WordPress → **Templates → Saved Templates → Import Templates**

Import these JSON files one by one:

| File | Use as |
| --- | --- |
| `contour-header.json` | ElementsKit header |
| `contour-footer.json` | ElementsKit footer |
| `contour-home.json` | Home page |
| `contour-services.json` | Services page |
| `contour-contact.json` | Contact page |
| `contour-privacy-policy.json` | Privacy Policy page |

Or in the Elementor editor: folder icon → **My Templates** → upload icon.

## 4. Header and footer (ElementsKit Lite)

1. ElementsKit → Header Footer → Add New
2. Type: **Header**, condition: Entire Site, Edit with Elementor
3. Folder icon → My Templates → insert **Contour — Header**
4. Repeat for **Footer** with `contour-footer.json`

Replace the HTML nav links with the **ElementsKit Nav Menu** widget after you create a WordPress menu (Home, Services, Contact).

## 5. Create pages

Create pages named Home, Services, Contact, Privacy Policy.

Edit each with Elementor → insert the matching template.

Set Home as the homepage under Settings → Reading.

## Notes

- Book Now uses Acuity: https://app.acuityscheduling.com/schedule/dcffaf1c
- Contact form is HTML `mailto` (Elementor Form is Pro-only)
- Google Maps widget needs an API key under Elementor → Settings → Integrations if the map is blank
