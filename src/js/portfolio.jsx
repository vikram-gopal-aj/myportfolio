import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/home";
import EStore from "./pages/estore";

function Portfolio() {
  useEffect(() => {
    const nav = document.getElementById("nav");

    const showNav = () => {
      nav.classList.add("show");
    };
    setTimeout(showNav, 1500);
  }, []);

  useEffect(() => {
    const navToggle = document.getElementById("nav-toggle");
    navToggle.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="nav-toggle-wrapper" id="nav-toggle">
        <button className="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <nav className="nav" id="nav">
        <ul>
          <li></li>
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/estore" className="nav-link">
              Simple E-Store
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estore" element={<EStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Portfolio;
