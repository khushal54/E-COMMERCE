# 🛒 ShopEZ - MERN E-Commerce Platform

ShopEZ is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) e-commerce application that enables users to browse products, manage carts, place orders, and track purchases. The platform also includes an admin dashboard for product and order management.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Product Details Page
- Add Products to Cart
- Update Cart Quantity
- Remove Products from Cart
- Place Orders
- Track Order Status
- View Order History

### 🛠️ Admin Features
- Secure Admin Login
- Add New Products
- Manage Products
- View All Orders
- Update Order Status
- Manage Categories & Banners

---

## 🏗️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt.js

### Database
- MongoDB Atlas

---

## 📁 Project Structure

```bash
ShopEZ/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database Collections

### Users
Stores user information.

```js
{
  username,
  email,
  password,
  mobile,
  address,
  pincode,
  userType
}
```

### Products

```js
{
  title,
  description,
  mainImg,
  category,
  sizes,
  gender,
  price,
  discount,
  stock
}
```

### Cart

```js
{
  userId,
  productId,
  quantity,
  size
}
```

### Orders

```js
{
  userId,
  items,
  totalPrice,
  address,
  paymentMethod,
  status
}
```

---

## 🔐 Authentication

JWT-based authentication is implemented.

Protected Routes:
- Cart
- Orders
- Admin Dashboard

Role-Based Access:
- USER
- ADMIN

Passwords are encrypted using Bcrypt.js.

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/shopez-ecommerce.git
cd shopez-ecommerce
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=shopez_secret_key_123

JWT_EXPIRES_IN=7d
```

Run backend:

```bash
npm run dev
```

Backend URL:

```txt
http://localhost:5000
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend URL:

```txt
http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Products

```http
GET /api/products
GET /api/products/:id
POST /api/products/:id/reviews
```

### Cart

```http
POST   /api/cart/add
GET    /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

### Orders

```http
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders/:id
PUT  /api/orders/:id/cancel
```

### Admin

```http
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id

GET    /api/admin/orders
PUT    /api/admin/orders/:id/status

GET    /api/admin/users

POST   /api/admin/banners
POST   /api/admin/categories
```

---

## 📸 Screens

### User
- Login Page
- Register Page
- Product Listing
- Product Details
- Cart
- Orders

### Admin
- Product Management
- Order Management
- Dashboard

---

## 🎯 Learning Outcomes

This project demonstrates:

- Full Stack MERN Development
- REST API Design
- MongoDB Data Modeling
- JWT Authentication
- Role Based Authorization
- State Management
- Frontend & Backend Integration
- E-Commerce Workflow Design

---


