"""Build Elementor 4.x container JSON templates (free Elementor + ElementsKit Lite)."""
from __future__ import annotations

import json
import uuid
from pathlib import Path

OUT = Path(__file__).resolve().parent
MEDIA = "https://contourlashandbrow.com.au/wp-content/uploads/contour"

BLUSH = "#DBBCB0"
BLUSH_LIGHT = "#F8F2F1"
INK = "#3E2D25"
INK_DEEP = "#362720"
BROWN = "#8F6F63"
MUTED = "#5E5E5E"
WHITE = "#FFFFFF"

BOOK = "https://app.acuityscheduling.com/schedule/dcffaf1c"
PHONE = "0426 194 413"
EMAIL = "Contourlashbrowperth@gmail.com"
ADDRESS = "2A/15-21 Collier Rd, Morley WA 6062"
ABN = "66 187 638 042"
FB = "https://www.facebook.com/people/Contour-Lash-and-Brow-Perth/61574393889689/"
IG = "https://www.instagram.com/contourlashandbrow/"
WA = "https://wa.me/61426194413"
MAPS = "https://maps.app.goo.gl/aDccHGXCsRR9w7PR6"


def uid() -> str:
    return uuid.uuid4().hex[:8]


def dim(size, unit="px"):
    return {"unit": unit, "size": size, "sizes": []}


def box(top, right=None, bottom=None, left=None, unit="px", linked=False):
    if right is None:
        right = bottom = left = top
        linked = True
    return {
        "unit": unit,
        "top": str(top),
        "right": str(right),
        "bottom": str(bottom),
        "left": str(left),
        "isLinked": linked,
    }


def link(url, external=False):
    return {
        "url": url,
        "is_external": "on" if external else "",
        "nofollow": "",
        "custom_attributes": "",
    }


def media(name, alt=""):
    return {"url": f"{MEDIA}/{name}", "id": "", "alt": alt, "source": "url"}


def gap(size=24):
    return {"column": str(size), "row": str(size), "unit": "px", "isLinked": True, "size": size}


def container(elements, settings=None, inner=False):
    merged = {"container_type": "flex"}
    if settings:
        merged.update(settings)
    return {
        "id": uid(),
        "elType": "container",
        "isInner": inner,
        "settings": merged,
        "elements": elements,
    }


def widget(widget_type, settings):
    return {
        "id": uid(),
        "elType": "widget",
        "widgetType": widget_type,
        "isInner": False,
        "settings": settings,
        "elements": [],
    }


def heading(title, tag="h2", align="left", color=INK_DEEP, size=32, family="Cinzel"):
    return widget(
        "heading",
        {
            "title": title,
            "header_size": tag,
            "align": align,
            "title_color": color,
            "typography_typography": "custom",
            "typography_font_family": family,
            "typography_font_size": dim(size),
            "typography_font_weight": "500",
            "typography_text_transform": "none" if tag == "h1" else "none",
        },
    )


def text(html, align="left", color=MUTED, size=16):
    return widget(
        "text-editor",
        {
            "editor": html,
            "align": align,
            "text_color": color,
            "typography_typography": "custom",
            "typography_font_family": "Source Sans 3",
            "typography_font_size": dim(size),
        },
    )


def image(name, alt="", align="center"):
    return widget(
        "image",
        {
            "image": media(name, alt),
            "image_size": "full",
            "align": align,
            "caption_source": "none",
        },
    )


def button(label, url, external=False, align="left", bg=BLUSH, color=INK_DEEP):
    return widget(
        "button",
        {
            "text": label,
            "link": link(url, external),
            "align": align,
            "background_color": bg,
            "button_text_color": color,
            "border_border": "solid",
            "border_width": box(1, linked=True),
            "border_color": BROWN,
            "border_radius": box(2, linked=True),
            "typography_typography": "custom",
            "typography_font_family": "Cinzel",
            "typography_font_size": dim(14),
            "typography_text_transform": "uppercase",
            "typography_letter_spacing": dim(1.5),
            "button_background_hover_background": "classic",
            "hover_color": BLUSH_LIGHT,
            "button_background_hover_color": INK,
        },
    )


def spacer(size=20):
    return widget("spacer", {"space": dim(size)})


def divider():
    return widget("divider", {"color": BLUSH, "weight": dim(1), "gap": dim(12)})


def boxed_section(elements, bg=WHITE, pad_y=72, direction="column"):
    return container(
        elements,
        {
            "content_width": "boxed",
            "boxed_width": dim(1140),
            "flex_direction": direction,
            "flex_align_items": "stretch",
            "flex_gap": gap(24),
            "padding": box(pad_y, 24, pad_y, 24),
            "background_background": "classic",
            "background_color": bg,
            "html_tag": "section",
        },
    )


def inner_row(elements, align="stretch", justify="flex-start", wrap=False):
    return container(
        elements,
        {
            "container_type": "flex",
            "content_width": "full",
            "flex_direction": "row",
            "flex_direction_mobile": "column",
            "flex_wrap": "wrap" if wrap else "nowrap",
            "flex_wrap_mobile": "wrap",
            "flex_gap": gap(24),
            "flex_align_items": align,
            "flex_justify_content": justify,
            "width": dim(100, "%"),
        },
        inner=True,
    )


def col(elements, width=None, extra=None):
    settings = {
        "container_type": "flex",
        "content_width": "full",
        "flex_direction": "column",
        "flex_gap": gap(12),
        "flex_size": "grow" if width is None else "custom",
        "flex_grow": 1 if width is None else 0,
        "width_mobile": dim(100, "%"),
        "flex_size_mobile": "custom",
    }
    if width is not None:
        settings["width"] = dim(width, "%")
    if extra:
        settings.update(extra)
    return container(elements, settings, inner=True)


def carousel(names, alts=None):
    slides = []
    for i, name in enumerate(names):
        alt = (alts or [""] * len(names))[i] if alts else ""
        slides.append(media(name, alt))
    return widget(
        "image-carousel",
        {
            "carousel": slides,
            "slides_to_show": "1",
            "navigation": "arrows",
            "autoplay": "no",
            "image_stretch": "yes",
            "arrows_color": BROWN,
        },
    )


def dump(name, title, doc_type, content, page_settings=None):
    data = {
        "title": title,
        "type": doc_type,
        "version": "0.4",
        "page_settings": page_settings if page_settings is not None else [],
        "content": content,
    }
    path = OUT / name
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"wrote {path.name} ({path.stat().st_size // 1024} KB)")


# --- Header (insert into ElementsKit Header) ---
def build_header():
    nav_html = """
<nav class="contour-nav" style="display:flex;gap:28px;justify-content:center;flex-wrap:wrap;">
  <a href="/" style="font-family:Cinzel,serif;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#3E2D25;text-decoration:none;">Home</a>
  <a href="/services/" style="font-family:Cinzel,serif;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#3E2D25;text-decoration:none;">Services</a>
  <a href="/contact/" style="font-family:Cinzel,serif;font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#3E2D25;text-decoration:none;">Contact</a>
</nav>
""".strip()
    bar = container(
        [
            col([image("logo.png", "Contour Lash and Brow")], width=22),
            col([widget("html", {"html": nav_html})], width=48),
            col([button("Book Now", BOOK, True, "right")], width=22),
        ],
        {
            "content_width": "boxed",
            "boxed_width": dim(1140),
            "flex_direction": "row",
            "flex_direction_mobile": "column",
            "flex_wrap": "nowrap",
            "flex_wrap_mobile": "wrap",
            "flex_align_items": "center",
            "flex_justify_content": "space-between",
            "flex_gap": gap(16),
            "padding": box(8, 24, 8, 24),
            "background_background": "classic",
            "background_color": WHITE,
            "border_border": "solid",
            "border_width": box(0, 0, 1, 0),
            "border_color": BLUSH,
            "html_tag": "header",
        },
    )
    dump(
        "contour-header.json",
        "Contour — Header",
        "page",
        [bar],
        {"content_wrapper_html_tag": "header", "background_background": "classic", "background_color": WHITE},
    )


def hours_html():
    return """
<div class="contour-hours">
  <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #EFE4DF;color:#5E5E5E;font-size:15px;"><span>Mon – Fri</span><span>9am – 7pm</span></div>
  <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #EFE4DF;color:#5E5E5E;font-size:15px;"><span>Saturday</span><span>9am – 5pm</span></div>
  <div style="display:flex;justify-content:space-between;padding:12px 0;color:#5E5E5E;font-size:15px;"><span>Sunday</span><span>10am – 5pm</span></div>
</div>
""".strip()


GOLD = "#C4A574"
ROSE = "#B0757A"
FOOTER_BG = "#FEF6F4"


def footer_card(title_icon, title, body_html):
    heading_box = widget(
        "icon-box",
        {
            "selected_icon": {"value": title_icon, "library": "fa-solid"},
            "view": "default",
            "title_text": title,
            "description_text": "",
            "position": "left",
            "title_size": "span",
            "primary_color": GOLD,
            "title_color": GOLD,
            "title_typography_typography": "custom",
            "title_typography_font_family": "Cinzel",
            "title_typography_font_size": dim(15),
            "title_typography_font_weight": "500",
            "title_typography_text_transform": "uppercase",
            "title_typography_letter_spacing": dim(1.6),
        },
    )
    return container(
        [heading_box, widget("html", {"html": body_html})],
        {
            "container_type": "flex",
            "content_width": "full",
            "flex_direction": "column",
            "flex_gap": gap(4),
            "width": dim(100, "%"),
            "padding": box(22, 22, 14, 22),
            "background_background": "classic",
            "background_color": WHITE,
            "border_radius": box(22, linked=True),
            "box_shadow_box_shadow_type": "yes",
            "box_shadow_box_shadow": {
                "horizontal": 0,
                "vertical": 10,
                "blur": 28,
                "spread": 0,
                "color": "rgba(62,45,37,0.08)",
            },
        },
        inner=True,
    )


def build_footer():
    contact_html = f"""
<div class="contour-contact">
  <div style="display:flex;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #EFE4DF;">
    <i class="fas fa-phone" style="color:{GOLD};width:18px;"></i>
    <a href="tel:0426194413" style="color:{ROSE};text-decoration:none;font-weight:600;">{PHONE}</a>
  </div>
  <div style="display:flex;gap:10px;align-items:center;padding:12px 0;border-bottom:1px solid #EFE4DF;">
    <i class="fas fa-envelope" style="color:{GOLD};width:18px;"></i>
    <a href="mailto:{EMAIL}" style="color:{ROSE};text-decoration:none;font-weight:600;word-break:break-word;">{EMAIL}</a>
  </div>
  <div style="display:flex;gap:10px;align-items:flex-start;padding:12px 0;">
    <i class="fas fa-map-marker-alt" style="color:{GOLD};width:18px;margin-top:3px;"></i>
    <div>
      <a href="{MAPS}" target="_blank" rel="noopener" style="color:{ROSE};text-decoration:none;font-weight:600;">{ADDRESS}</a>
      <div style="color:#5E5E5E;font-size:14px;margin-top:2px;">Inside Australian Cosmetic Hub</div>
    </div>
  </div>
</div>
""".strip()

    social = widget(
        "social-icons",
        {
            "social_icon_list": [
                {"_id": uid(), "social_icon": {"value": "fab fa-facebook-f", "library": "fa-brands"}, "link": link(FB, True)},
                {"_id": uid(), "social_icon": {"value": "fab fa-instagram", "library": "fa-brands"}, "link": link(IG, True)},
                {"_id": uid(), "social_icon": {"value": "fab fa-whatsapp", "library": "fa-brands"}, "link": link(WA, True)},
            ],
            "shape": "rounded",
            "align": "center",
            "icon_color": "custom",
            "icon_primary_color": GOLD,
            "icon_secondary_color": "rgba(0,0,0,0)",
            "icon_size": dim(15),
            "icon_padding": dim(12),
            "border_border": "solid",
            "border_width": box(1.5, linked=True),
            "border_color": GOLD,
            "border_radius": box(50, linked=True, unit="%"),
            "hover_primary_color": WHITE,
            "hover_secondary_color": GOLD,
        },
    )

    legal = text(
        f"<a href='/privacy-policy/' style='color:{ROSE};text-decoration:none;font-weight:600;'>Privacy Policy</a>"
        f" &nbsp;<span style='color:{GOLD};'>•</span>&nbsp; "
        f"ABN <span style='color:{ROSE};font-weight:600;'>{ABN}</span>",
        "center",
        MUTED,
        14,
    )
    copy = text("© 2026 Contour Lash &amp; Brow", "center", MUTED, 14)
    credit = text("Designed &amp; Developed by Weblyst", "center", MUTED, 13)

    wrap = container(
        [
            image("logo.png", "Contour Lash and Brow", "center"),
            text("Appointments only", "center", MUTED, 16),
            footer_card("fas fa-clock", "Opening Hours", hours_html()),
            footer_card("fas fa-map-marker-alt", "Contact & Location", contact_html),
            social,
            legal,
            copy,
            credit,
        ],
        {
            "content_width": "boxed",
            "boxed_width": dim(560),
            "flex_direction": "column",
            "flex_align_items": "center",
            "flex_gap": gap(16),
            "padding": box(48, 20, 36, 20),
            "background_background": "classic",
            "background_color": FOOTER_BG,
            "html_tag": "footer",
        },
    )
    dump(
        "contour-footer.json",
        "Contour — Footer",
        "page",
        [wrap],
        {
            "content_wrapper_html_tag": "footer",
            "background_background": "classic",
            "background_color": FOOTER_BG,
        },
    )



def hero():
    slides = carousel(
        ["hero-lashes.jpg", "hero-brows.jpg", "hero-hybrid.jpg"],
        ["Volume eyelash extensions", "Brow lamination and lash lift", "Hybrid wispy lash extensions"],
    )
    slides["settings"].update(
        {
            "slides_to_show": "1",
            "autoplay": "yes",
            "autoplay_speed": 5000,
            "infinite": "yes",
            "navigation": "both",
            "image_stretch": "yes",
            "arrows_color": BLUSH_LIGHT,
            "dots_color": BLUSH_LIGHT,
        }
    )
    content = container(
        [
            heading("Contour Lash and Brow", "h6", "left", BLUSH, 16, "Libre Baskerville"),
            heading("Enhance Your Natural Beauty", "h1", "left", BLUSH_LIGHT, 46),
            text("Lash extensions, lash lifts and brow treatments in Morley — located inside Australian Cosmetic Hub.", color=BLUSH_LIGHT, size=18),
            inner_row(
                [
                    button("Book Now", BOOK, True),
                    widget("button", {
                        "text": "View services",
                        "link": link("/services/"),
                        "align": "left",
                        "background_color": "rgba(0,0,0,0)",
                        "button_text_color": BLUSH_LIGHT,
                        "border_border": "solid",
                        "border_width": box(0, 0, 1, 0),
                        "border_color": BLUSH,
                        "typography_typography": "custom",
                        "typography_font_family": "Cinzel",
                        "typography_font_size": dim(13),
                        "typography_text_transform": "uppercase",
                    }),
                ],
                align="center",
            ),
        ],
        {
            "content_width": "boxed",
            "boxed_width": dim(1140),
            "flex_direction": "column",
            "flex_gap": gap(16),
            "flex_justify_content": "center",
            "padding": box(80, 24, 80, 24),
            "position": "absolute",
            "z_index": 2,
            "width": dim(100, "%"),
            "_offset_orientation_h": "start",
            "offset_x": dim(0),
            "_offset_orientation_v": "start",
            "offset_y": dim(0),
        },
        inner=True,
    )
    return container(
        [slides, content],
        {
            "content_width": "full",
            "flex_direction": "column",
            "min_height": "min-height",
            "custom_height": dim(78, "vh"),
            "overflow": "hidden",
            "background_background": "classic",
            "background_color": INK_DEEP,
            "background_overlay_background": "classic",
            "background_overlay_color": "#362720",
            "background_overlay_opacity": {"unit": "px", "size": 0.35, "sizes": []},
            "html_tag": "section",
        },
    )


def feature_card(img_name, title, body):
    return col(
        [
            image(img_name, title),
            heading(title, "h3", "left", INK_DEEP, 18),
            text(body, size=15),
        ],
        width=31,
        extra={"background_background": "classic", "background_color": WHITE, "padding": box(0, 0, 20, 0)},
    )


def review_card(quote, source):
    return col(
        [
            heading("★★★★★", "h6", "left", BROWN, 16),
            text(f"“{quote}”", size=16),
            text(source, size=13),
        ],
        width=48,
        extra={"background_background": "classic", "background_color": WHITE, "padding": box(28, 24, 28, 24), "border_border": "solid", "border_width": box(1, linked=True), "border_color": BLUSH},
    )


def gallery_card(name, alt):
    return col([image(name, alt)], width=31)


def build_home():
    welcome = boxed_section(
        [
            inner_row(
                [
                    col(
                        [
                            heading("Welcome", "h6", "left", BROWN, 16, "Libre Baskerville"),
                            heading("Welcome to Contour Lash and Brow", "h2", "left", INK_DEEP, 32),
                            text("Welcome to Contour Lash and Brow, where we enhance your natural beauty. Our technicians use high-quality products and careful application to create lashes and brows that feel lightweight, look polished, and last."),
                            text("Whether you want a soft natural classic set or a full glam transformation, we will help you choose the style that suits your eye shape and everyday routine. Appointments are available seven days a week."),
                            button("Book Now", BOOK, True),
                        ],
                        width=50,
                    ),
                    col([image("fb-01.jpg", "Contour Lash and Brow services flyer")], width=50),
                ]
            )
        ]
    )
    services = boxed_section(
        [
            heading("Services", "h6", "center", BROWN, 16, "Libre Baskerville"),
            heading("Look and feel your best", "h2", "center", INK_DEEP, 32),
            text("We offer classic, hybrid and volume eyelash extensions, plus lash lifts, brow wax, tint, styling and lamination.", "center"),
            inner_row(
                [
                    feature_card("collage-classic.jpg", "Classic Lashes", "Natural Classic and Glamour Classic — one extension on each natural lash, from a soft everyday finish to extra length and definition."),
                    feature_card("collage-hybrid.jpg", "Hybrid Lashes", "Natural Hybrid, Deluxe Hybrid, Wispy Wet Look and Textured Kim K — classic mixed with volume fans for texture and fullness."),
                    feature_card("collage-volume.jpg", "Volume Lashes", "Natural Volume 3D, Deluxe Volume 5D, Dramatic Volume 7D and Mega Volume 10D — lightweight fans from a soft everyday look to full glam."),
                    feature_card("collage-lift.jpg", "Lash Lift", "Lash lift, and lash lift & tint with keratin — curl and define your natural lashes without extensions."),
                    feature_card("collage-brow.jpg", "Brow Sculpting", "Brow wax, tint, styling and lamination to shape, fill and polish your natural brows."),
                ],
                wrap=True,
            ),
            container([button("See full price list", "/services/", False, "center")], {"content_width": "full", "flex_justify_content": "center"}, inner=True),
        ],
        bg=BLUSH_LIGHT,
    )
    gallery = boxed_section(
        [
            heading("Our work", "h6", "center", BROWN, 16, "Libre Baskerville"),
            heading("From the salon", "h2", "center", INK_DEEP, 32),
            inner_row(
                [
                    gallery_card(name, alt)
                    for name, alt in [
                        ("classic-natural.jpg", "Natural classic lash extensions"),
                        ("classic-glamour.jpg", "Glamour classic lash extensions"),
                        ("hybrid-natural.jpg", "Natural hybrid lash extensions"),
                        ("hybrid-deluxe.jpg", "Deluxe hybrid lash extensions"),
                        ("hybrid-wet.jpg", "Wispy wet look lash extensions"),
                        ("hybrid-kimk.jpg", "Textured Kim K lash extensions"),
                        ("volume-3d.jpg", "Natural volume 3D lash extensions"),
                        ("volume-5d.jpg", "Deluxe volume 5D lash extensions"),
                        ("volume-7d.jpg", "Dramatic volume 7D lash extensions"),
                        ("volume-10d.jpg", "Mega volume 10D lash extensions"),
                        ("lift-01.jpg", "Lash lift result"),
                        ("lift-02.jpg", "Lash lift and tint result"),
                        ("brow-styling.jpg", "Brow styling result"),
                        ("brow-lamination.jpg", "Brow lamination result"),
                        ("brow-wax.jpg", "Brow wax result"),
                        ("brow-tint.jpg", "Brow tint result"),
                    ]
                ],
                wrap=True,
            ),
        ]
    )
    review_images = [f"review-{i:02d}.jpg" for i in range(1, 21)]
    review_slider = carousel(review_images, [f"Client review {i}" for i in range(1, 21)])
    review_slider["settings"]["slides_to_show"] = "1"
    review_slider["settings"]["autoplay"] = "yes"
    review_slider["settings"]["autoplay_speed"] = 4000
    review_slider["settings"]["infinite"] = "yes"
    review_slider["settings"]["navigation"] = "both"
    review_slider["settings"]["arrows_color"] = BROWN
    review_slider["settings"]["dots_color"] = BROWN
    reviews = boxed_section(
        [
            heading("Reviews", "h6", "center", BROWN, 16, "Libre Baskerville"),
            heading("What clients say", "h2", "center", INK_DEEP, 32),
            review_slider,
            inner_row(
                [
                    review_card(
                        "10/10 recommend I got my lashes done by Aaron and he did an amazing job absolutely love them.",
                        "Facebook review",
                    ),
                    review_card(
                        "I had a glamour set booked in with Aaron today. He absolutely exceeded my expectations! The best set I’ve ever had done. Aaron had amazing customer service skills and I felt comfortable and well taken care of.",
                        "Facebook review",
                    ),
                ]
            ),
        ],
        bg=BLUSH_LIGHT,
    )
    expect = boxed_section(
        [
            inner_row(
                [
                    col(
                        [
                            heading("What to expect", "h6", "left", BROWN, 16, "Libre Baskerville"),
                            heading("What are eyelash extensions?", "h2"),
                            text("Eyelash extensions are semi-permanent lashes applied to each natural lash individually for the most natural-looking result. Unlike strip lashes, a professional lash stylist attaches one extension to each of your natural lashes."),
                            text("A full set takes around 1 to 2 hours depending on the style you choose. Refills are generally 1 to 1.5 hours every 2–4 weeks to keep your set looking fresh."),
                        ],
                        width=50,
                    ),
                    col(
                        [
                            heading("Before you visit", "h6", "left", BROWN, 16, "Libre Baskerville"),
                            heading("Preparation", "h2"),
                            text("Please remove all eye make-up before your appointment so we can use the full treatment time on your lashes."),
                            text("Contact lenses cannot be worn during treatment, as your eyes stay closed while extensions are applied. Avoid waterproof mascara for at least 3 days prior — it can be very difficult to remove."),
                        ],
                        width=50,
                    ),
                ]
            )
        ]
    )
    cta = container(
        [
            heading("Appointments available", "h2", "center", BLUSH_LIGHT, 32),
            text("Book online with live availability — appointments only.", "center", BLUSH_LIGHT),
            container([button("Book Now", BOOK, True, "center", WHITE, INK_DEEP)], {"content_width": "full", "flex_justify_content": "center"}, inner=True),
        ],
        {
            "content_width": "boxed",
            "boxed_width": dim(1140),
            "flex_direction": "column",
            "flex_align_items": "center",
            "padding": box(80, 24, 80, 24),
            "background_background": "classic",
            "background_color": INK,
            "html_tag": "section",
        },
    )
    dump("contour-home.json", "Contour — Home", "page", [hero(), welcome, services, gallery, reviews, expect, cta])


def service_row(name, meta, desc, prices, images):
    price_html = "<br>".join(f"{label}: ${price}" for label, price in prices)
    return inner_row(
        [
            col([carousel(images, [name] * len(images))], width=28),
            col(
                [
                    heading(name, "h3", "left", INK_DEEP, 20),
                    text(meta, color=BROWN, size=13),
                    text(desc),
                ],
                width=44,
            ),
            col(
                [
                    widget(
                        "text-editor",
                        {
                            "editor": price_html,
                            "text_color": BROWN,
                            "typography_typography": "custom",
                            "typography_font_family": "Libre Baskerville",
                            "typography_font_size": dim(18),
                            "typography_font_style": "italic",
                        },
                    )
                ],
                width=22,
            ),
        ],
        align="center",
    )


def category_block(subtitle, title, rows, bg=WHITE, collage=None):
    els = [
        heading(subtitle, "h6", "center", BROWN, 16, "Libre Baskerville"),
        heading(title, "h2", "center", INK_DEEP, 32),
    ]
    if collage:
        els.append(image(collage, title))
    els.extend(rows)
    return boxed_section(els, bg=bg, pad_y=40)


def build_services():
    classic = ["classic-natural.jpg", "classic-glamour.jpg"]
    glamour = ["classic-glamour.jpg", "classic-natural.jpg"]
    hybrid = ["hybrid-natural.jpg", "hybrid-deluxe.jpg", "hybrid-wet.jpg"]
    deluxe = ["hybrid-deluxe.jpg", "hybrid-wet.jpg", "hybrid-kimk.jpg"]
    wet = ["hybrid-wet.jpg", "hybrid-deluxe.jpg", "hybrid-kimk.jpg"]
    kimk = ["hybrid-kimk.jpg", "hybrid-wet.jpg", "hybrid-deluxe.jpg"]
    volume = ["volume-3d.jpg", "volume-5d.jpg", "volume-7d.jpg"]
    deluxe_vol = ["volume-5d.jpg", "volume-7d.jpg", "volume-10d.jpg"]
    dramatic = ["volume-7d.jpg", "volume-10d.jpg", "volume-5d.jpg"]
    mega = ["volume-10d.jpg", "volume-7d.jpg", "volume-5d.jpg"]
    brows = ["brow-styling.jpg", "brow-lamination.jpg", "brow-wax.jpg", "brow-tint.jpg"]
    brow_wax = ["brow-wax.jpg", "brow-styling.jpg"]
    brow_tint = ["brow-tint.jpg", "brow-styling.jpg"]
    brow_lamination = ["brow-lamination.jpg", "brow-styling.jpg"]
    lift = ["lift-01.jpg", "lift-02.jpg", "lift-03.jpg", "lift-04.jpg"]

    head = boxed_section(
        [
            inner_row(
                [
                    col([heading("Our Services", "h1", "center", INK_DEEP, 42)]),
                    col([button("Book Now", BOOK, True, "right")], extra={"flex_justify_content": "flex-end"}),
                ],
                align="center",
                justify="space-between",
            )
        ],
        pad_y=40,
    )

    blocks = [
        head,
        category_block(
            "1 lash attached on 1 natural lash",
            "Classic Lashes",
            [
                service_row("Natural Classic", "60 mins · +$10 add on cashmere", "Enhance your eyes with a delicate and elegant set of lashes for a fresh, natural appearance. Around 60–70 extensions per eye are applied to create a soft, lightweight look.", [("Full set", 95), ("2 week Refill", 65), ("3 week Refill", 75)], classic),
                service_row("Glamour Classic", "75 mins · +$10 add on cashmere", "Individual lash extensions are carefully applied to each natural lash to create added length, fullness, and curl. This service lashes up to 90% of healthy, mature natural lashes, creating the perfect balance between natural and defined.", [("Full set", 115), ("2 week Refill", 80), ("3 week Refill", 90)], glamour),
            ],
            collage="collage-classic.jpg",
        ),
        category_block(
            "Mixed between Classic & Volume Lashes",
            "Hybrid Lashes",
            [
                service_row("Natural Hybrid", "90 mins · +$10 add on cashmere", "A beautiful mix of classic and volume lashes for the perfect balance of definition and softness. Using individual lashes and lightweight 3D fans, this set creates a textured, fluffy, and naturally fuller look with effortless elegance.", [("Full set", 135), ("2 week Refill", 90), ("3 week Refill", 105)], hybrid),
                service_row("Deluxe Hybrid", "90 mins", "A fuller, more glamorous hybrid set that combines classic lashes with 5D volume fans. This technique creates a soft yet dense finish, adding beautiful fullness, texture, and depth while still keeping a lightweight and fluttery feel.", [("Full set", 155), ("2 week Refill", 100), ("3 week Refill", 115), ("4 week Refill", 135)], deluxe),
                service_row("Wispy Wet Look", "90 mins", "A textured, modern lash style that creates a soft “wet mascara” effect with added wispy definition. This set is achieved using narrow closed volume fans (4–5D), where 4–5 lightweight lash fibres are placed closely together and applied to each natural lash.", [("Full set", 155), ("2 week Refill", 100), ("3 week Refill", 115), ("4 week Refill", 135)], wet),
                service_row("Textured Kim K", "105 mins", "A wispy, spiky lash style inspired by a strip-lash look. It combines 7D volume fans and longer spikes in mixed lengths to create a bold, textured, and glamorous finish with beautiful definition and dimension.", [("Full set", 185), ("2 week Refill", 120), ("3 week Refill", 135), ("4 week Refill", 155)], kimk),
            ],
            collage="collage-hybrid.jpg",
        ),
        category_block(
            "Lightweight fans for a fuller finish",
            "Volume Lashes",
            [
                service_row("Natural Volume 3D", "90 mins", "Created by applying 3 lightweight lash fibres per natural lash to form a soft fan. This set gives a natural, light, and softly enhanced fullness, perfect for an everyday elegant look.", [("Full set", 135), ("2 week Refill", 90), ("3 week Refill", 105)], volume),
                service_row("Deluxe Volume 5D", "90 mins", "Using 5 lash fibres per natural lash to create fuller fans. It delivers a noticeably bolder, fluffier, and more glamorous look while still maintaining softness.", [("Full set", 155), ("2 week Refill", 100), ("3 week Refill", 115), ("4 week Refill", 135)], deluxe_vol),
                service_row("Dramatic Volume 7D", "90 mins", "Applies 7 ultra-fine lash fibres per natural lash for a denser, more defined fan. This set gives a dramatic, full, and luxurious appearance with strong volume and depth.", [("Full set", 175), ("2 week Refill", 115), ("3 week Refill", 130), ("4 week Refill", 150)], dramatic),
                service_row("Mega Volume 10D", "105 mins", "Created with 10 ultra-fine lash fibres per natural lash, forming a dense, ultra-full fan. This style provides an intense, dark, and high-impact dramatic look for maximum volume and definition.", [("Full set", 205), ("2 week Refill", 130), ("3 week Refill", 145), ("4 week Refill", 165)], mega),
            ],
            collage="collage-volume.jpg",
        ),
        category_block(
            "Add-ons & extras",
            "Lash Lifts, Brows & More",
            [
                image("collage-lift.jpg", "Lash Lift"),
                image("collage-brow.jpg", "Brow Sculpting"),
                service_row("Lash Lift", "", "Lift and curl your natural lashes for a wide-awake look that lasts several weeks — no extensions needed.", [("Price", 75)], lift),
                service_row("Lash Lift & Tint + Keratine", "", "Lash lift with a tint and keratin treatment to darken, nourish and define your natural lashes.", [("Price", 90)], lift),
                service_row("Lash Tint", "", "A gentle tint that darkens your natural lashes for extra definition without mascara.", [("Price", 25)], lift),
                service_row("Brow Wax", "", "Clean, shaped brows with a precise wax to tidy the arch and highlight your natural brow line.", [("Price", 25)], brow_wax),
                service_row("Brow Tint", "", "Tint fills sparse areas and adds depth so brows look fuller and more defined.", [("Price", 30)], brow_tint),
                service_row("Brow Wax & Tint", "", "Shape and colour in one visit for neat, filled-in brows that frame the eyes.", [("Price", 50)], brows),
                service_row("Brow Lamination (with wax and tint)", "", "Brow lamination with wax and tint to brush hairs into place, fill gaps and create a soft laminated finish.", [("Price", 90)], brow_lamination),
                service_row("Makeup Removal", "", "Gentle eye make-up removal before a lash or brow treatment so we can use the full appointment time.", [("Price", 15)], lift),
                service_row("Lash Extensions Removal (per 15 mins)", "", "Safe professional removal of existing extensions. Charged per 15 minutes depending on the amount to remove.", [("Price", 20)], classic),
                service_row("Patch Test", "", "Recommended before your first lash or tint service, especially if you have sensitive eyes or known allergies.", [("Price", 15)], brows),
            ],
            bg=BLUSH_LIGHT,
        ),
    ]
    dump("contour-services.json", "Contour — Services", "page", blocks)


def build_contact():
    hours = """<ul style="list-style:none;padding:0;margin:0;">
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Monday</span><span>9am – 7pm</span></li>
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Tuesday</span><span>9am – 7pm</span></li>
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Wednesday</span><span>9am – 7pm</span></li>
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Thursday</span><span>9am – 7pm</span></li>
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Friday</span><span>9am – 7pm</span></li>
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Saturday</span><span>9am – 5pm</span></li>
<li style="display:flex;justify-content:space-between;border-bottom:1px solid #DBBCB0;padding:6px 0;"><span>Sunday</span><span>10am – 5pm</span></li>
</ul>"""
    form = f"""<form action="mailto:{EMAIL}" method="post" enctype="text/plain" style="display:flex;flex-direction:column;gap:14px;">
<label style="font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:{INK};">Name
<input required name="name" style="width:100%;border:1px solid {BLUSH};padding:12px 14px;font-size:16px;box-sizing:border-box;"></label>
<label style="font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:{INK};">Email
<input required type="email" name="email" style="width:100%;border:1px solid {BLUSH};padding:12px 14px;font-size:16px;box-sizing:border-box;"></label>
<label style="font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:{INK};">Phone
<input name="phone" style="width:100%;border:1px solid {BLUSH};padding:12px 14px;font-size:16px;box-sizing:border-box;"></label>
<label style="font-family:Cinzel,serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:{INK};">Message
<textarea required name="message" rows="5" style="width:100%;border:1px solid {BLUSH};padding:12px 14px;font-size:16px;box-sizing:border-box;"></textarea></label>
<button type="submit" style="min-width:150px;padding:12px 28px;border:1px solid {BROWN};background:{BLUSH};color:{INK_DEEP};font-family:Cinzel,serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;">Send message</button>
</form>"""
    intro = boxed_section(
        [
            heading("Get in touch", "h6", "center", BROWN, 16, "Libre Baskerville"),
            heading("Contact Us", "h1", "center", INK_DEEP, 42),
            text("Questions about a lash style, a refill, or your first visit? Send us a message or book online.", "center"),
        ],
        pad_y=48,
    )
    body = boxed_section(
        [
            inner_row(
                [
                    col(
                        [
                            heading("Salon details", "h2"),
                            text(f"<strong>Location</strong><br>{ADDRESS}<br>Located inside Australian Cosmetic Hub"),
                            text(f"<strong>Phone</strong><br><a href='tel:0426194413'>{PHONE}</a>"),
                            text(f"<strong>Email</strong><br><a href='mailto:{EMAIL}'>{EMAIL}</a>"),
                            text("<strong>Opening hours</strong><br>Appointments only"),
                            widget("html", {"html": hours}),
                            button("Book Now", BOOK, True),
                        ],
                        width=48,
                    ),
                    col(
                        [
                            heading("Send a message", "h2"),
                            widget("html", {"html": form}),
                        ],
                        width=48,
                    ),
                ]
            )
        ]
    )
    maps = container(
        [
            widget(
                "google_maps",
                {
                    "address": f"{ADDRESS}, Australian Cosmetic Hub",
                    "zoom": {"size": 16},
                    "height": dim(380),
                    "prevent_scroll": "yes",
                },
            )
        ],
        {
            "content_width": "full",
            "padding": box(0, linked=True),
            "html_tag": "section",
        },
    )
    dump("contour-contact.json", "Contour — Contact", "page", [intro, body, maps])


def build_privacy():
    dump(
        "contour-privacy-policy.json",
        "Contour — Privacy Policy",
        "page",
        [
            boxed_section(
                [
                    heading("Legal", "h6", "left", BROWN, 16, "Libre Baskerville"),
                    heading("Privacy Policy", "h1"),
                    text(f"Contour Lash and Brow (ABN {ABN}) respects your privacy and handles personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth)."),
                    heading("What we collect", "h2", size=24),
                    text("We may collect your name, phone number, email address, appointment details, patch-test records, and any notes you share about sensitivities, eye health, or preferred lash styles. If you book online through Acuity Scheduling, that platform also collects the details needed to create your booking."),
                    heading("How we use it", "h2", size=24),
                    text("We use your information to book and confirm appointments, provide treatments, send appointment reminders, process payments, and respond to enquiries. We do not sell your personal information."),
                    heading("Who we share it with", "h2", size=24),
                    text("We may share information with our online booking provider, payment processors, and professional advisers when required. We may also disclose information if the law requires us to do so."),
                    heading("Storage and security", "h2", size=24),
                    text("Information is stored in our booking system and salon records. We take reasonable steps to protect it from misuse, interference, loss, and unauthorised access."),
                    heading("Access and questions", "h2", size=24),
                    text(f"You can ask to access or correct your personal information, or raise a privacy concern, by emailing <a href='mailto:{EMAIL}'>{EMAIL}</a> or calling <a href='tel:0426194413'>{PHONE}</a>."),
                    text("This policy may be updated from time to time. The latest version will always be available on this page."),
                ]
            )
        ],
    )


def build_readme():
    (OUT / "README.md").write_text(
        f"""# Contour Elementor templates

Built for **Elementor free 4.2.x** + **ElementsKit Lite** using **Container layout only** (no Atomic widgets, no Elementor Pro Theme Builder types).

## 1. Upload images first

Copy everything in `templates/assets/` to:

`wp-content/uploads/contour/`

Files:

- `logo.png`
- `fb-01.jpg` … `fb-09.jpg`

Image URLs in the JSON files point to:

`{MEDIA}/...`

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

- Book Now uses Acuity: {BOOK}
- Contact form is HTML `mailto` (Elementor Form is Pro-only)
- Google Maps widget needs an API key under Elementor → Settings → Integrations if the map is blank
""",
        encoding="utf-8",
    )


if __name__ == "__main__":
    build_header()
    build_footer()
    build_home()
    build_services()
    build_contact()
    build_privacy()
    build_readme()
