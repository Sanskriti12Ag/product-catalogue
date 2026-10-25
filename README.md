# Goods. — Product Catalogue

A responsive product catalogue built with React and Vite using the DummyJSON Products API. Search, filter, and sort products through a clean, responsive interface.

## Live Demo

**Website:** https://product-catalogue-pied.vercel.app

**GitHub Repository:** https://github.com/Sanskriti12Ag/product-catalogue

## Features

- Fetches products from the DummyJSON API
- Search products by name (case-insensitive)
- Filter by product category
- Filter by minimum and maximum price
- Sort by price: low to high and high to low
- Sort by rating: high to low and low to high
- Loading and error states
- Empty state when no products match
- Responsive design for desktop, tablet, and mobile
- Product cards showing images, descriptions, categories, prices, and ratings

## Tech Stack

- React
- JavaScript
- Vite
- CSS
- DummyJSON Products API

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Sanskriti12Ag/product-catalogue.git
cd product-catalogue
npm install
npm run dev
```

Open the local URL displayed in your terminal.

## API

Product data is fetched from:

https://dummyjson.com/products?limit=0

## Project Structure

```text
product-catalogue/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Future Improvements

- Pagination or infinite scrolling
- Product detail pages
- Automated tests

## Author

Sanskriti Agarwal
