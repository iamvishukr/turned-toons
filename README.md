# TurnedToons — portfolio website (Next.js)

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Build for hosting
    npm run build      # static site is written to /out

Upload the `out/` folder to any static host (Vercel, Netlify, Cloudflare Pages, Hostinger, GoDaddy, etc.).
On Vercel you can also just import the repo — no settings needed.

## Edit your details (one file)
`lib/site.ts`
- `SITE.url` → your real domain (used for SEO, sitemap, social previews)
- `CONTACT` → email, Instagram, Facebook, mailing address
- `WORKS` → project titles / descriptions / categories
- `FAQS` → questions & answers (also published as Google FAQ rich results)

## Add a new project
1. Put images in `public/works/` as `name-toon.webp` (≈1800px) and `name-toon-sm.webp` (≈720px).
   Reference photos the same way: `name-photo.webp` / `name-photo-sm.webp`.
2. Add an entry to `WORKS` in `lib/site.ts`. Entries with `refs` automatically appear in the Before & After slider.

## SEO included
- Title, description, keywords, canonical URL, robots directives
- Open Graph + Twitter cards with a 1200×630 share image
- JSON-LD structured data: WebSite, ProfessionalService, Person, ImageGallery, FAQPage
- sitemap.xml (with image sitemap), robots.txt, web manifest, favicon
- Semantic headings, descriptive alt text, lazy-loaded responsive WebP images
After going live: submit `https://yourdomain/sitemap.xml` in Google Search Console.
