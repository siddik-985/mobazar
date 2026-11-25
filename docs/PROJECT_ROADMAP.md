# MoBazar Project Roadmap

## Current verified state
- Bengali-first, mobile-friendly storefront is implemented with HTML, CSS, and vanilla JavaScript.
- Product catalog, search, category filters, cart quantity controls, and demo checkout UI are present.
- Cart is stored in browser localStorage.
- Checkout currently shows demo confirmation only; orders are not persisted or sent to shops.
- Products and prices are sample data.

## Pilot launch scope
- One local shop has been selected as a private supplier for the pilot; supplier shop name, address, and identifying details must not be shown to customers on the storefront.
- Initial delivery coverage is limited to three unions of Mujibnagar Upazila, Meherpur, Bangladesh:
  - Bagowan Union (বাগোয়ান)
  - Monakhali Union (মোনাখালী)
  - Dariapur Union (দারিয়াপুর)
- Product photos are available with the user; product names, selling prices, and stock need verification before publishing. Customers see MoBazar branding only, not supplier identity or location.
- Start small, test real orders, and expand coverage only after the pilot works reliably.

## Next development phases
1. Audit existing storefront files and identify improvements without breaking current behavior.
2. Collect and verify supplier product photos, product names, purchase costs, selling prices, and availability privately.
3. Keep supplier identity private on the customer storefront; add delivery-area validation so checkout is limited to the three pilot unions.
4. Implement backend order storage and order confirmation.
5. Build an admin dashboard for products, shops, and orders.
6. Add shopkeeper workflows to update products and stock.
7. Add delivery workflow and order status tracking.
8. Start with cash on delivery; evaluate mobile payments later.
9. Test the end-to-end order flow on mobile before launch.

## Business model
- MoBazar is the customer-facing seller/service brand; supplier shops are private sourcing partners.
- Customers order through MoBazar, MoBazar procures from the supplier, checks/organizes the order, and delivers to the customer.
- Do not expose supplier shop names, addresses, or direct purchasing details to customers.

## Working principle
Keep changes small, reviewable, and tested. Do not publish customer data or secrets in the repository.
