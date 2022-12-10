import React from 'react'
import { Link } from 'react-router-dom';


export default function NavBar({localStorageData, logOut }) {
  return (
    <>
<nav className="navbar navbar-expand-lg bg-dark nav-dark ">
  <div className="container-fluid ">
    <Link className="navbar-brand text-white ms-3"  to="home">Game Over</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      {localStorageData?
      <div className="navbar-nav ms-auto ">
        
      <Link className="nav-link" to="/" >Home</Link>
      <Link className="nav-link" to="all" >All</Link>

      <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platform
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="Platforms/pc" >PC</Link></li>
            <li><Link className="dropdown-item" to="Platforms/browser" >Browser </Link></li>
          </ul>
          </li>

          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          sort-by
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="sortBy/release-date" >release-date</Link></li>
            <li><Link className="dropdown-item" to="sortBy/popularity" >popularity </Link></li>
            <li><Link className="dropdown-item" to="sortBy/alphabetical" >alphabetical </Link></li>
            <li><Link className="dropdown-item" to="sortBy/relevance" >relevance </Link></li>
          </ul>
          </li>
          
          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Categories
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="categories/racing" >racing</Link></li>
            <li><Link className="dropdown-item" to="categories/sports" >sports </Link></li>
            <li><Link className="dropdown-item" to="categories/social">social</Link></li>
            <li><Link className="dropdown-item" to="categories/shooter">shooter</Link></li>
            <li><Link className="dropdown-item" to="categories/open-world">open-world</Link></li>
            <li><Link className="dropdown-item" to="categories/zombie">zombie</Link></li>
            <li><Link className="dropdown-item" to="categories/fantasy">fantasy</Link></li>
            <li><Link className="dropdown-item" to="categories/action-rpg">action-rpg</Link></li>
            <li><Link className="dropdown-item" to="categories/action">action</Link></li>
            <li><Link className="dropdown-item" to="categories/flight" >flight</Link></li>
            <li><Link className="dropdown-item" to="categories/battle-royale" >battle-royale</Link></li>
          </ul>
        </li>
          <li onClick={logOut} className="nav-link pointer	"  >LogOut</li>




      </div>
:
<div className="navbar-nav ms-auto">
<Link className="nav-link mx-3" to="login" >Login</Link>
<Link className="nav-link" to="register" >Register</Link>
</div>

      }
    </div>
  </div>
</nav>
    </>
  );
}
