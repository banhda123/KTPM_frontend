# API Server for KTPM Frontend

This is a simple Express.js server that provides a mock API for the KTPM frontend application.

## Setup

1. Install dependencies:
   ```
   cd server
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

3. The server will run on http://localhost:3001

## Available Endpoints

- `GET /products` - Get all products with optional filtering
  - Query parameters:
    - `category` - Filter by category
    - `featured=true` - Show only featured products
    - `new=true` - Show only new products
    - `sort` - Sort by 'price', 'name', 'rating', or 'createdAt'
    - `order` - Sort order, 'asc' or 'desc'
    - `page` - Page number for pagination
    - `limit` - Number of items per page
    - `search` - Search term to filter products

- `GET /products/:id` - Get a single product by ID

- `POST /auth/login` - Authenticate user
  - Request body:
    ```json
    {
      "email": "user@example.com",
      "password": "password"
    }
    ```

## Frontend Configuration

Make sure your frontend is configured to use this API server by setting the following environment variables in your `.env` file:

```
REACT_APP_API_URL=http://localhost:3001
REACT_APP_USE_MOCK_API=false
```
