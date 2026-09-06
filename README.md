# AURA Lifestyle — Frontend

A modern, responsive clothing e-commerce frontend built for the Bangladeshi fashion market.

The frontend provides a clean shopping experience with product browsing, category navigation, search, filtering, cart management, authentication, checkout, and order history.

---

## ✨ Features

* 🏠 Modern fashion-focused homepage
* 👕 Men, Women, Kids & Accessories categories
* 🛍️ Product catalog with search
* 🔎 Product filtering and sorting
* 📦 Product details with size/color selection
* 🛒 Persistent shopping cart
* 🔐 User registration and login
* 👤 Authentication state management
* 💳 Cash on Delivery checkout
* 📋 Order history
* 📄 Individual order details
* 📱 Fully responsive design
* ⚡ Loading and empty states
* 🎨 Clean fashion-oriented UI
* 🔗 REST API integration with Express backend
* 🍪 HTTP-only session cookie support

---

## 🛠️ Tech Stack

| Technology   | Purpose               |
| ------------ | --------------------- |
| Next.js 14   | React framework       |
| React 18     | UI library            |
| JavaScript   | Application language  |
| Tailwind CSS | Styling               |
| Lucide React | Icons                 |
| Better Auth  | Authentication        |
| Fetch API    | Backend communication |

---

## 📁 Project Structure

```text
frontend/
│
├── app/
│   ├── (shop categories)
│   │   ├── men/
│   │   ├── women/
│   │   ├── kids/
│   │   └── accessories/
│   │
│   ├── products/
│   │   ├── page.jsx
│   │   └── [id]/
│   │       └── page.jsx
│   │
│   ├── cart/
│   │   └── page.jsx
│   │
│   ├── checkout/
│   │   └── page.jsx
│   │
│   ├── orders/
│   │   ├── page.jsx
│   │   └── [id]/
│   │       └── page.jsx
│   │
│   ├── login/
│   │   └── page.jsx
│   │
│   ├── register/
│   │   └── page.jsx
│   │
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── CategoryCard.jsx
│   ├── ProductCard.jsx
│   ├── ProductGrid.jsx
│   ├── SearchBar.jsx
│   ├── CartItem.jsx
│   ├── CartSummary.jsx
│   ├── OrderCard.jsx
│   ├── Loading.jsx
│   └── EmptyState.jsx
│
├── lib/
│   ├── api.js
│   ├── auth-client.js
│   ├── CartContext.jsx
│   └── format.js
│
├── public/
│
├── .env.local
├── .env.example
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js 18+
* npm 9+
* A running AURA Lifestyle backend

---

### 1. Clone the Repository

```bash
git clone https://github.com/asadullah-studio/AURA-e-Commers-Client.git
```

Go into the project:

```bash
cd AURA-e-Commers-Client
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create:

```bash
.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_AUTH_URL=http://localhost:5000
```

For production:

```env
NEXT_PUBLIC_API_URL=https://aura-e-commers-server.onrender.com/api
NEXT_PUBLIC_AUTH_URL=https://aura-e-commers-server.onrender.com
```

> Never commit `.env.local` to Git.

---

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

---

## 🔌 Backend API

The frontend communicates with the Express backend through REST APIs.

Development:

```text
http://localhost:5000/api
```

Production:

```text
https://aura-e-commers-server.onrender.com/api
```

The API client is centralized in:

```text
lib/api.js
```

---

## 🔐 Authentication

Authentication is handled using Better Auth on the backend.

The frontend uses:

```text
lib/auth-client.js
```

Authentication sessions are maintained using cookies.

API requests include:

```javascript
credentials: 'include'
```

This allows the browser to send authentication cookies with requests to the backend.

---

## 🛒 Cart

The global cart state is managed through:

```text
lib/CartContext.jsx
```

Cart functionality includes:

* Add product
* Select size
* Update quantity
* Remove item
* Calculate subtotal
* Display cart count
* Persist cart for authenticated users

The actual cart data for logged-in users is stored in PostgreSQL through the backend.

---

## 📦 Checkout

The checkout page collects:

* Customer name
* Phone number
* Email
* Address
* City
* Area

Payment method:

```text
Cash on Delivery (COD)
```

The frontend submits the order to the backend.

The backend is responsible for validating prices and creating the final order.

---

## 🔎 Product Browsing

Users can:

* Browse all products
* Browse by category
* Search products
* Filter products
* Sort products
* View product details
* Select available sizes/colors
* Add products to cart

Supported categories:

```text
Men
Women
Kids
Accessories
```

---

## 📱 Responsive Design

The application is designed for:

* 📱 Mobile
* 📲 Tablet
* 💻 Desktop

The UI uses Tailwind CSS responsive utilities to provide a consistent shopping experience across screen sizes.

---

## 🧩 Important Components

### Navbar

Provides:

* Logo
* Navigation
* Search
* Cart
* Cart count
* Authentication state
* User menu

### ProductCard

Displays:

* Product image
* Product name
* Price
* Discount price
* Rating
* Discount badge
* Quick add functionality

### ProductGrid

Reusable responsive product grid.

Desktop:

```text
4 columns
```

Mobile:

```text
2 columns
```

### CartSummary

Displays:

* Cart subtotal
* Item count
* Checkout action

### OrderCard

Displays summarized order information in order history.

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Run production server:

```bash
npm start
```

---

## 🌐 Deployment

The frontend can be deployed to Vercel.

Production environment variables:

```env
NEXT_PUBLIC_API_URL=https://aura-e-commers-server.onrender.com/api
NEXT_PUBLIC_AUTH_URL=https://aura-e-commers-server.onrender.com
```

Production frontend:

```text
https://aura-e-commers-client.vercel.app
```

Make sure the backend CORS configuration allows the production frontend origin.

---

## 🔗 Related Project

Backend repository:

```text
https://github.com/asadullah-studio/AURA-e-Commers-Server.git
```

Backend API:

```text
https://aura-e-commers-server.onrender.com
```

---

## 📄 License

This project is created for educational and portfolio purposes.

---

## 👨‍💻 Author

**Asadullah**

AURA Lifestyle — Full-Stack Clothing E-Commerce
