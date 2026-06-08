# Natours

A full-stack tour booking application built with Node.js, Express, MongoDB, and Mongoose. Users can browse tours, create accounts, book tours through Stripe Checkout, leave reviews, and manage their profiles.

## Features

- User authentication and authorization with JWT
- Secure password hashing using bcrypt
- Password reset via email
- Tour booking with Stripe Checkout
- Reviews and ratings system
- User profile management
- Image upload and processing
- Interactive tour maps
- Server-side rendering with Pug
- RESTful API architecture
- Security best practices and middleware protection

---

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security

- JWT (JSON Web Tokens)
- bcryptjs
- Helmet
- express-rate-limit
- express-mongo-sanitize
- xss-clean

### Payments

- Stripe

### Email Services

- Nodemailer
- Resend SMTP

### File Handling

- Multer
- Sharp

### Templating

- Pug

---

## API Endpoints

### Authentication

```http
POST /api/v1/users/signup
POST /api/v1/users/login
POST /api/v1/users/forgotPassword
PATCH /api/v1/users/resetPassword/:token
PATCH /api/v1/users/updateMyPassword
```

### Tours

```http
GET    /api/v1/tours
GET    /api/v1/tours/:id
POST   /api/v1/tours
PATCH  /api/v1/tours/:id
DELETE /api/v1/tours/:id
```

### Reviews

```http
GET    /api/v1/reviews
POST   /api/v1/reviews
PATCH  /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
```

### Users

```http
GET    /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/updateMe
DELETE /api/v1/users/deleteMe
```

---
