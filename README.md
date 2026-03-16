# MUAAJ.beauty
### A Luxury E-commerce Ritual for Skin & Self-Care

**MUAAJ.beauty** is a professional, high-performance e-commerce platform built with the **MERN stack** and **Next.js 15**.  
It introduces a **"Ritual-First" shopping experience**, where users explore skincare products through **skin concerns, categories, and step-by-step usage guides**.

The platform focuses on **clean UX, SEO performance, and a premium shopping experience**.

---

#  Key Features

###  Ritual-Based Product Discovery
Browse products by **specific skin concerns** such as:
- Acne
- Brightening
- Hydration
- Anti-Aging

Or explore by **product category**.

---

### 🔗 SEO-Optimized Slugs
Human-readable URLs improve search engine visibility.

Example:/product/glow-serum


---

###  Admin Dashboard
Full **CRUD functionality** for managing products:

- Add new products
- Edit product information
- Manage stock
- Upload product images via ImgBB
- Toggle **Featured Products**

---

###  Server-Side Rendering (SSR)
Built using **Next.js Server Components** for:

- Faster loading
- Better SEO
- Dynamic metadata

---

###  Responsive Luxury UI
A modern, premium UI built with:

- Tailwind CSS
- DaisyUI
- Framer Motion animations

Fully responsive across **desktop, tablet, and mobile** devices.

---

#  Tech Stack

## Frontend
- Next.js 15 (App Router)
- Tailwind CSS
- DaisyUI
- Framer Motion
- Lucide React Icons

## Backend
- Next.js Server Actions
- Next.js API Routes

## Database
- MongoDB (Native Driver)

## Authentication
- NextAuth.js (Admin authentication)

## Storage
- ImgBB API (Product image hosting)

---

#  Setup & Installation

## 1️⃣ Clone the Repository

bash
git clone https://github.com/your-username/muaaj-beauty.git
cd muaaj-beauty

2️⃣ Install Dependencies
npm install

3️⃣ Environment Configuration

Create a .env.local file in the root directory and add the following:

MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_auth_secret
IMGBB_API_KEY=your_imgbb_key

4️⃣ Run the Development Server
npm run dev

Open your browser and visit:

http://localhost:3000

| Route                 | Description                                                         |
| --------------------- | ------------------------------------------------------------------- |
| `/`                   | Landing page with Hero, Categories, Concerns, and Featured products |
| `/shop`               | Product gallery with filtering and sorting                          |
| `/shop/[[...filter]]` | Dynamic filtering (category, concern, etc.)                         |
| `/product/[slug]`     | Product details page with ingredients and ritual steps              |

| Route                    | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `/admin/dashboard`       | Overview with product inventory                  |
| `/admin/add-product`     | Create new products                              |
| `/admin/manage-products` | Edit products, stock, price, and featured status |

Each product includes:

Ingredients

Skin type compatibility

Step-by-step usage guide

📝 Future Milestones

Planned improvements for the platform:

 Stripe Checkout integration for secure payments

 User Skin Profile for personalized product recommendations

 Saved skincare rituals

 Real-time product reviews & ratings

 Wishlist and shopping cart persistence

 Advanced product search & filtering
