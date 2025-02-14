# Product API - README

## Overview

This project provides a **Product API** built with **Node.js** and **MongoDB**. It supports multiple filtering options, pagination, sorting, and selection of specific fields.

## Features

- **Filtering by category, featured status, and search query (title/description).**
- **Numeric filtering (price, rating) with comparison operators (********`>, <, >=, <=, =`********).**
- **Sorting by multiple fields.**
- **Field selection for optimizing API responses.**
- **Pagination with customizable limits.**

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-repo/product-api.git
   cd product-api
   ```
2. **Install dependencies:**
   ```sh
   npm install or npm run dev
   ```
3. **Create a ********`.env`******** file and configure your database connection:**
   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
4. **Run the project:**
   ```sh
   npm start
   ```

## API Endpoints

### 1. **Get All Products with Filters**

**Endpoint:**

```http
GET /api/products
```

**Query Parameters:**

| Parameter        | Type    | Description                                                  |
| ---------------- | ------- | ------------------------------------------------------------ |
| `search`         | String  | Filter by title or description (case insensitive)            |
| `category`       | String  | Filter by category                                           |
| `featured`       | Boolean | Filter by featured products (`true/false`)                   |
| `sort`           | String  | Sort by fields (comma-separated)                             |
| `select`         | String  | Select specific fields (comma-separated)                     |
| `numericFilters` | String  | Filter with numeric comparisons (e.g., `price>20,rating>=4`) |
| `page`           | Number  | Specify page number for pagination                           |
| `limit`          | Number  | Number of products per page                                  |

**Example Request:**

```http
GET /api/products?search=phone&category=electronics&sort=price,-rating&numericFilters=price>100,rating>=4&page=1&limit=10
```

### 2. **Response Format**

```json
{
  "pagination": {
    "nbHits": 10,
    "page": 1,
    "totalPages": 5
  },
  "products": [
    {
      "_id": "60c72b2f9b1d8b3d88f1e2a1",
      "name": "Smartphone XYZ",
      "price": 299.99,
      "category": "electronics",
      "rating": 4.5,
      "featured": true,
      "createdAt": "2023-01-01T12:00:00.000Z"
    }
  ]
}
```

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **HTTP Status Codes**

## License

This project is licensed under the **MIT License**.

