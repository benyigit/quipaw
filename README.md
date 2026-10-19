# Quipaw Dog Treats

Next.js App Router + React + TypeScript website for Quipaw. Includes a home page, searchable and filterable blog archive, and community events page.

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Production build and server:

```bash
npm run build
npm run start
```

The app is ready to connect to a Node.js hosting provider such as Vercel. Product availability, checkout, and mailing-list signups are presentation previews; connect Shopify and a mailing-list provider before launch.

The contact phone shown in the reference design is +1 (832) 555-0123.

## Interactive experiences

The home page Paw Passport (`/#match`) lets visitors choose a name, portrait and chew mood, then download a 1080 × 1350 PNG. The profile is stored only in that browser and can be cleared with Start fresh. Product suggestions link to the existing filtered shop.

Happy Tails (`/#happy-tails`) starts with clearly labelled brand scrapbook imagery. Visitors can filter and enlarge photos and compose a submission email. The optional photo preview stays on the device; the visitor attaches the photo manually in their email app. There is no server upload, automatic publication or review database. The team reviews incoming submissions before adding approved, consented stories to the gallery.
