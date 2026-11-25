# MoBazar Project Roadmap

## Current verified state
- Bengali-first, mobile-friendly storefront is implemented with HTML, CSS, and vanilla JavaScript.
- Product catalog, search, category filters, cart quantity controls, and demo checkout UI are present.
- Cart is stored in browser localStorage.
- Checkout currently shows demo confirmation only; orders are not persisted or sent to shops.
- Products and prices are sample data.

## Next development phases
1. Audit the existing storefront files and identify improvements without breaking current behavior.
2. Replace sample products with verified local shop/product/price data.
3. Implement backend order storage and order confirmation.
4. Build an admin dashboard for products, shops, and orders.
5. Add shopkeeper workflows to update products and stock.
6. Add delivery workflow and order status tracking.
7. Start with cash on delivery; evaluate mobile payments later.
8. Test the end-to-end order flow on mobile before launch.

## Initial rollout
- Start with 5–10 local shops.
- Verify products, prices, availability, delivery areas, and shop contact details.
- Run test orders before public launch.

## Working principle
Keep changes small, reviewable, and tested. Do not publish customer data or secrets in the repository.
