# MoBazar Project Roadmap

## Current verified state
- Bengali-first, mobile-friendly storefront is implemented with HTML, CSS, and vanilla JavaScript.
- Product catalog, search, category filters, cart quantity controls, and demo checkout UI are present.
- Cart is stored in browser localStorage.
- Checkout currently shows demo confirmation only; orders are not persisted or sent to shops.
- Products and prices are sample data.

## Pilot launch scope
- One local shop has been selected as a private supplier; supplier shop name, address, and identifying details must not be shown to customers on the storefront.
- Initial delivery coverage is limited to three unions of Mujibnagar Upazila, Meherpur, Bangladesh:
  - Bagowan Union (বাগোয়ান)
  - Monakhali Union (মোনাখালী)
  - Dariapur Union (দারিয়াপুর)
- Product photos are available with the user; product names, purchase costs, selling prices, and stock need verification before publishing.
- MoBazar is the customer-facing seller/service brand. Customers order from MoBazar; MoBazar privately sources the products from supplier(s), checks/organizes orders, and delivers to customers.
- Do not expose supplier names, addresses, phone numbers, or direct-buy details on the storefront.
- Start small, test real orders, and expand coverage only after the pilot works reliably.

## Recommended technology stack
- Frontend and admin panel: Next.js (move beyond the current static HTML/CSS/vanilla JavaScript storefront).
- Backend/data: Supabase Postgres database, Auth for admin sign-in, and Storage for product images.
- Hosting/deployment: Vercel, connected to GitHub.
- Secure data access: enforce Row Level Security (RLS); supplier purchase cost and supplier identity are private/admin-only; never place service-role secrets in browser code.

## Build order (admin-first)
1. Audit existing storefront files and plan a careful Next.js migration without losing the current design/features.
2. Build secure admin login.
3. Build product management: upload photo, name, category, unit, supplier purchase cost (private), selling price, stock/availability, publish/unpublish.
4. Build supplier records privately (supplier/shop name, address/contact and agreed purchase terms), never customer-visible.
5. Create customer storefront that reads published products from the database and displays only MoBazar branding, product info, selling price, and availability.
6. Add delivery-area validation for the three pilot unions.
7. Implement order storage, order confirmation, and admin order management.
8. Add delivery workflow and order status tracking.
9. Start with cash on delivery; evaluate mobile payments later.
10. Test the end-to-end order flow on mobile before launch.

## Product photo and pricing collection checklist
- Product photo (clear, product-focused; avoid shop signboards or identifiable shop/location in customer-facing photo).
- Product name and brand/variant when applicable.
- Unit/pack size (e.g. piece, kg, litre, pack).
- Supplier purchase cost (private/admin only).
- MoBazar selling price.
- Stock/availability.
- Optional expiry date for relevant products.

## Working principle
Keep changes small, reviewable, and tested. Do not publish customer data or secrets in the repository.
