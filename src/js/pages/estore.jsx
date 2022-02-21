import React, { useEffect, useRef, useState } from "react";

function SearchBar(props) {
  const searchInput = useRef(null);
  const categories = [];

  Object.keys(props.products).map(function (key) {
    let product = props.products[key];
    if (categories.indexOf)
      categories.push(
        <option key={key} value={product.category}>
          {product.category}
        </option>
      );
  });

  return (
    <div className="search-bar">
      <h1>{props.categories}</h1>
      <select
        onChange={(e) => {
          props.handleCategorySelect(e.target.value);
        }}
      >
        {categories}
      </select>
      <input
        ref={searchInput}
        type="text"
        name="search"
        placeholder="Search products..."
      />
      <button
        type="button"
        onClick={() => {
          props.handleSearch(searchInput.current.value);
        }}
      >
        <svg
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 487.95 487.95"
        >
          <g>
            <g>
              <path
                d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
			c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
			c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
              />
            </g>
          </g>
        </svg>
      </button>
    </div>
  );
}

function ProductCard(props) {
  return (
    <article className="product-card">
      <img
        className="product-img"
        src={props.product.image}
        alt={props.product.title}
      />
      <span className="product-price">${props.product.price}</span>
      <span className="product-category">{props.product.category}</span>
      <h4 className="product-name">{props.product.title}</h4>
      <div className="product-action">
        <button
          className="jsAddToCart"
          onClick={() => {
            props.handleAddToCart(props.product.id);
          }}
        >
          Add To Cart
        </button>
      </div>
    </article>
  );
}

function ProductGrid(props) {
  const filteredProducts = [];
  const query = props.searchTerm.toLowerCase();
  const cat = props.category.toLowerCase();

  Object.keys(props.products).map(function (key) {
    let product = props.products[key];
    if (product.title.toLowerCase().indexOf(query) === -1) return;
    if (product.category.toLowerCase().indexOf(cat) === -1) return;
    filteredProducts.push(
      <ProductCard
        key={key}
        product={product}
        handleAddToCart={props.handleAddToCart}
      />
    );
  });
  return filteredProducts;
}

function EStore() {
  const [cart, setCart] = useState([]);
  const [products, fetchProducts] = useState({});
  const [searchTerm, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const categories = [];
  const notification = document.getElementsByClassName("product-grid-msg")[0];

  const addToCart = (productId) => {
    let product = products.find((item) => item.id === productId);

    setCart([...cart, product]);

    if (notification) {
      notification.classList.add("show");
      notification.textContent = product.title + " was added to cart!";
    }
  };

  const handleSearch = (query) => {
    setSearch(query);
  };

  const handleCategorySelect = (selectedCat) => {
    setCategory(selectedCat);
  };

  useEffect(async () => {
    const productsJSON = await fetch("http://localhost:3001/products").then(
      (response) => response.json()
    );
    fetchProducts(productsJSON);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      notification && notification.classList.remove("show");
    }, 3000);
  }, [cart]);

  return (
    <div className="main-content">
      <SearchBar
        handleSearch={handleSearch}
        handleCategorySelect={handleCategorySelect}
        products={products}
      />
      <div className="product-grid">
        <p className="product-grid-msg"></p>
        <ProductGrid
          products={products}
          handleAddToCart={addToCart}
          searchTerm={searchTerm}
          category={category}
        />
      </div>
    </div>
  );
}

export default EStore;
