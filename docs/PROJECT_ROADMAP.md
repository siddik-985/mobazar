# MoBazar Project Roadmap

## Current verified state
- Bengali-first, mobile-friendly storefront is implemented with HTML, CSS, and vanilla JavaScript.
- Product catalog, search, category filters, cart quantity controls, and demo checkout UI are present.
- Cart is stored in browser localStorage.
- Checkout currently shows demo confirmation only; orders are not persisted or sent to shops.
- Products and prices are sample data.

## Pilot launch scope
- One local shop has been selected for the pilot (shop name/details and product data still need to be collected).
- Initial delivery coverage is limited to three unions of Mujibnagar Upazila, Meherpur, Bangladesh:
  - Bagowan Union (বাগোয়ান)
  - Monakhali Union (মোনাখালী)
  - Dariapur Union (দারিয়াপুর)
- Product photos are available with the user; product names, prices, stock, and shop details need verification before publishing.
- Start small, test real orders, and expand coverage only after the pilot works reliably.

## Next development phases
1. Audit existing storefront files and identify improvements without breaking current behavior.
2. Collect and verify first shop information and product photos/names/prices/availability.
3. Add delivery-area validation so checkout is limited to the three pilot unions.
4. Implement backend order storage and order confirmation.
5. Build an admin dashboard for products, shops, and orders.
6. Add shopkeeper workflows to update products and stock.
7. Add delivery workflow and order status tracking.
8. Start with cash on delivery; evaluate mobile payments later.
9. Test the end-to-end order flow on mobile before launch.

## Working principle
Keep changes small, reviewable, and tested. Do not publish customer data or secrets in the repository.
