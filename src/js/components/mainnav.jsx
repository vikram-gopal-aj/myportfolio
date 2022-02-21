import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from "react-router-dom";
import { useEffect } from "react";

import Home from "./../pages/home";
import Components from "./../pages/components";
import Projects from "./../pages/projects";
import EStore from "../pages/estore";

function MainNav() {
  useEffect(() => {
    const nav = document.getElementById("nav");

    const showNav = () => {
      nav.classList.add("show");
    };
    setTimeout(showNav, 1500);
  }, []);

  useEffect(() => {
    const navToggle = document.getElementById('nav-toggle');
    navToggle.addEventListener('click', function(){
      this.classList.toggle('active');
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<Components />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/estore" element={<EStore />} />
      </Routes>
      <div className="nav-toggle-wrapper" id="nav-toggle"><button className="nav-toggle"><span></span><span></span><span></span></button></div>
      <nav className="nav" id="nav">
        <ul>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/projects" className="nav-link">
              Apps
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/components" className="nav-link">
              Components
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/estore" className="nav-link">
              Simple E-Store
            </Link>
          </li>
        </ul>
      </nav>
    </BrowserRouter>
  );
}

export default MainNav;
