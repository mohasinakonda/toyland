# Product Requirements Document (PRD)

# Product Name

Toy Planet

# Version

1.0 (MVP)

# Prepared By

Product Team

# Date

20 June 2026

---

# 1. Product Overview

Toy Planet is a mobile-first toy e-commerce platform designed specifically for children and their parents. The platform focuses on creating a fun, colorful, and engaging shopping experience for children while keeping the purchasing process simple for parents.

The platform allows users to:

* Browse toys
* View toy details
* Place orders without registration
* Track orders using phone numbers

The MVP intentionally keeps the experience simple by limiting the website to three customer-facing pages.

---

# 2. Problem Statement

Most e-commerce websites are designed for adults. Their interfaces are text-heavy and visually overwhelming for children.

Parents need:

* Easy toy discovery
* Fast checkout
* No account creation
* Easy order tracking

Children need:

* Large visuals
* Fun interactions
* Bright and playful design
* Simple navigation

Toy Planet bridges both needs.

---

# 3. Goals

## Business Goals

* Launch MVP quickly
* Validate market demand
* Minimize operational complexity
* Build repeat customers

## User Goals

Children:

* Explore toys visually
* Enjoy browsing experience

Parents:

* Purchase toys quickly
* Track orders easily
* Avoid registration process

---

# 4. Target Audience

## Primary Users

Children aged 3-10 years.

## Secondary Users

Parents aged 24-45 years.

---

# 5. Success Metrics

## Business KPIs

* Orders per day
* Conversion rate
* Repeat orders
* Average order value

## Product KPIs

* Product page CTR
* Add-to-order rate
* Order completion rate
* Order tracking usage
* Average session duration

---

# 6. Core Features

## Feature 1: Home Page

Purpose:
Introduce the brand and encourage exploration.

Sections:

1. Hero Banner
2. Featured Toys
3. Categories
4. Why Shop With Us
5. Footer

---

## Feature 2: Product Listing Page

Purpose:
Allow users to browse toys.

Features:

* Product grid
* Search
* Category filter
* Age filter
* Price filter
* Pagination

---

## Feature 3: Product Details Page

Purpose:
Help parents make purchase decisions.

Sections:

* Product images
* Product information
* Price
* Age recommendation
* Stock status
* Development benefits
* Order form

---

## Feature 4: Order Placement

Requirements:

Customer should be able to place an order without:

* Registration
* Login
* OTP verification

Required Fields:

* Parent name
* Phone number
* Address
* Quantity

System Actions:

* Generate tracking number
* Create order
* Save order items
* Show success page

---

## Feature 5: Order Tracking

Requirements:

Users should be able to:

* Enter phone number
* View previous orders
* See order statuses

Statuses:

1. Placed
2. Confirmed
3. Packed
4. Shipped
5. Delivered
6. Cancelled

---

# 7. Customer Journey

## Flow 1

Home
→ Product Listing
→ Product Details
→ Order Form
→ Order Success

## Flow 2

Home
→ Track Order
→ Phone Number
→ Order Status

---

# 8. Functional Requirements

## Home Page

FR-01
Display hero section.

FR-02
Display featured products.

FR-03
Display categories.

FR-04
Display promotional banners.

---

## Product Listing

FR-05
Display products.

FR-06
Search products.

FR-07
Filter by category.

FR-08
Filter by age.

FR-09
Filter by price.

FR-10
Paginate products.

---

## Product Details

FR-11
Display image gallery.

FR-12
Display product information.

FR-13
Display age recommendations.

FR-14
Display developmental benefits.

FR-15
Display order form.

---

## Orders

FR-16
Create order.

FR-17
Generate tracking ID.

FR-18
Save customer information.

FR-19
Save order items.

FR-20
Show success message.

---

## Tracking

FR-21
Search by phone number.

FR-22
Display orders.

FR-23
Display status history.

---

# 9. Non-Functional Requirements

Performance:

* First load < 2 seconds
* API response < 500 ms

Availability:

* 99% uptime

Responsiveness:

* Mobile first
* Tablet support
* Desktop support

Accessibility:

* Large buttons
* Readable fonts
* High contrast

Security:

* Input validation
* Rate limiting
* SQL injection protection
* Phone number masking in admin

---

# 10. Child Psychology Design Requirements

## Colors

Primary:

* Sky Blue
* Yellow
* Orange

Secondary:

* Green
* Purple

Avoid:

* Dark gray
* Black backgrounds

---

## Typography

Font:

Baloo Da 2

Headings:
Rounded font

Body:
Easy-to-read font

---

## UI Elements

Buttons:

* Large
* Rounded
* Animated

Cards:

* Large images
* Minimal text

Interactions:

* Hover animations
* Micro-interactions
* Success confetti

---

## Visual Principles

* Image first
* Text second
* Simple navigation
* Low cognitive load
* Friendly mascot

---

# 11. Database Design

Products

* id
* name
* slug
* description
* price
* stock
* age_group
* category_id
* thumbnail
* created_at

Categories

* id
* name
* slug
* icon

ProductImages

* id
* product_id
* image_url

Orders

* id
* tracking_id
* customer_name
* phone
* address
* status
* total
* created_at

OrderItems

* id
* order_id
* product_id
* quantity
* price

OrderStatusHistory

* id
* order_id
* status
* created_at

---

# 12. Tech Stack

Frontend:

* Next.js
* TypeScript
* Tailwind CSS
* Framer Motion

Backend:

* Next.js Route Handlers

Database:

* SQLite
* Prisma ORM

Storage:

* imagekit

Deployment:

* Vercel

---

# 13. Admin Requirements (Internal)

Dashboard

* Product management
* Category management
* Order management
* Search by phone
* Update order status
* Inventory management

---

# 14. MVP Scope

Included:
✓ Home Page
✓ Product Listing Page
✓ Product Details Page
✓ Order Placement
✓ Order Tracking
✓ Admin Dashboard
✓ SQLite Integration

Not Included:
✗ Payment Gateway
✗ User Accounts
✗ Wishlist
✗ Reviews
✗ Coupons
✗ Multi-vendor
✗ Recommendation Engine
✗ Push Notifications

---

# 15. Future Roadmap (v2)

* Online payment
* OTP verification
* Wishlist
* Product recommendations
* Recently viewed products
* Delivery tracking map
* Loyalty points
* AI toy recommendation based on age
* Personalized home page
