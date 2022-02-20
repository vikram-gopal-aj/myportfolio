import React, { useEffect, useState } from "react";

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
        {/* <input type="number" name="quantity" /> */}
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

function EStore() {
  const [cart, setCart] = useState([]);
  const [products, fetchProducts] = useState({});
  const notification = document.getElementsByClassName("product-grid-msg")[0];

  const addToCart = (productId) => {
    let product = products.find((item) => item.id === productId);

    setCart([...cart, product]);

    if (notification) {
      notification.classList.add("show");
      notification.textContent = product.title + " was added to cart!";
    }
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
      <div className="product-grid">
        <p className="product-grid-msg"></p>
        {Object.keys(products).map(function (key) {
          return (
            <ProductCard
              key={key}
              product={products[key]}
              handleAddToCart={addToCart}
            />
          );
        })}
      </div>
    </div>
  );
}

export default EStore;
