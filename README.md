# E-commerce Platform - MERN Stack Project

This is a full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). The frontend is developed using **React.js** with **TypeScript**, **Redux** for state management, and **RTK Query** for fetching data from the backend API.

Backend code and details are managed in a separate repository.
### [Backend Repository](https://github.com/pallabroy2234/ecommerce-backend-v2.git)

### [Live Demo](https://ecom-frontend-v2-b7a6fa88076b.herokuapp.com/)
> **Note:** The frontend is hosted on **Heroku**, and the backend is hosted on **Heroku**'s free hosting.  
> _The backend server may take some time to start up if it has been inactive for a while._

## Features

- **User Authentication:** Sign up, login, and secure routes using Firebase.
- **Product Management:** View, search, and filter products.
- **Shopping Cart:** Add products to the cart, adjust quantities, and proceed to checkout.
- **Payment Integration:** Integrated with **Stripe** for secure payment processing.
- **Order Management:** View past orders, order status, and order details.
- **Responsive Design:** Mobile-friendly layout.
- **Real-time Notifications:** Using **React Hot Toast** for user feedback.
- **Analytics & Charts:** Visualize data using **Chart.js**.

## Technologies Used

### Frontend

- **React.js**: ^18.2.0
- **TypeScript**: For type safety.
- **Redux**: ^9.1.2 - State management.
- **RTK Query**: Data fetching and caching.
- **React Router DOM**: ^6.23.1 - Routing.
- **Axios**: ^1.7.4 - For making API requests.
- **Firebase**: ^10.12.0 - For authentication.
- **Stripe.js**: ^4.4.0 - Payment processing.
- **Sass**: ^1.77.1 - For styling.
- **Moment.js**: ^2.30.1 - Date formatting.
- **Chart.js**: ^4.4.2 & **React Chart.js 2**: ^5.2.0 - Data visualization.
- **React Hot Toast**: ^2.4.1 - Notifications.
- **React Icons**: ^5.2.1 - Icons.
- **React Table**: ^7.8.0 - Displaying data in tables.

## Installation
```bash
npm install
```

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- npm (or yarn)
- MongoDB (for the backend)
- Firebase account (for authentication)
- Stripe account (for payment integration)

### Clone the repository

```bash
git clone https://github.com/pallabroy2234/ecommerce-frontend-v2.git/client
cd client
```

### Environment Variables

| Environment Variable Key              | Description                             |
|---------------------------------------|-----------------------------------------|
| VITE_NODE_ENV                         | Environment (e.g., development, production) |
| VITE_DEVELOPMENT_URL                  | Backend development URL                 |
| VITE_PRODUCTION_URL                   | Backend production URL                  |
| VITE_TESTING_URL                      | Backend testing URL                     |
| VITE_STAGING_URL                      | Backend staging URL                     |
| VITE_DEVELOPMENT_FRONTEND_URL          | Frontend development URL                |
| VITE_PRODUCTION_FRONTEND_URL           | Frontend production URL                 |
| VITE_TESTING_FRONTEND_URL              | Frontend testing URL                    |
| VITE_STAGING_FRONTEND_URL              | Frontend staging URL                    |
| VITE_FIREBASE_API_KEY                 | Firebase API key                        |
| VITE_FIREBASE_AUTH_DOMAIN             | Firebase auth domain                    |
| VITE_FIREBASE_PROJECT_ID              | Firebase project ID                     |
| VITE_FIREBASE_STORAGE_BUCKET          | Firebase storage bucket                 |
| VITE_FIREBASE_MESSAGING_SENDER_ID     | Firebase messaging sender ID            |
| VITE_FIREBASE_APP_ID                  | Firebase app ID                         |
| VITE_FIREBASE_MEASUREMENT_ID          | Firebase measurement ID                 |
| VITE_STRIPE_PUBLISHABLE_KEY           | Stripe publishable key                  |