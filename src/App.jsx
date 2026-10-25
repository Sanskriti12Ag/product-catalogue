import { useEffect, useState } from 'react'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} loading="lazy" />
      <p className="category">{product.category}</p>
      <h3>{product.title}</h3>
      <p>{product.description}</p>

      <div className="product-details">
        <strong>${product.price}</strong>
        <span>⭐ {product.rating}</span>
      </div>
    </article>
  )
}

function App() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=0')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load products.')
        return response.json()
      })
      .then((data) => setProducts(data.products))
      .catch(() => setError('Unable to load products. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const categories = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.trim().toLowerCase())

      const matchesCategory =
        category === 'all' || product.category === category

      const matchesMinPrice =
        minPrice === '' || product.price >= Number(minPrice)

      const matchesMaxPrice =
        maxPrice === '' || product.price <= Number(maxPrice)

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice
      )
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating-high':
          return b.rating - a.rating
        case 'rating-low':
          return a.rating - b.rating
        default:
          return 0
      }
    })

  return (
    <main>
      <header>
        <h1>Goods.</h1>
        <p>Find the right product, faster.</p>
      </header>

      <div className="search-box">
        <input
          type="search"
          placeholder="Search products by name..."
          aria-label="Search products by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filter-box">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === 'all' ? 'All categories' : item}
            </option>
          ))}
        </select>
      </div>

      <div className="price-filters">
        <label>
          Min price ($)
          <input
            type="number"
            min="0"
            placeholder="0"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
          />
        </label>

        <label>
          Max price ($)
          <input
            type="number"
            min="0"
            placeholder="No limit"
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
          />
        </label>

        <button
          type="button"
          onClick={() => {
            setMinPrice('')
            setMaxPrice('')
          }}
        >
          Clear prices
        </button>
      </div>

      <div className="sort-box">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="default">Default order</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating-high">Rating: High to Low</option>
          <option value="rating-low">Rating: Low to High</option>
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <p>
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {filteredProducts.length > 0 ? (
            <section className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          ) : (
            <p>No products found. Try changing your search or filters.</p>
          )}
        </>
      )}
    </main>
  )
}

export default App