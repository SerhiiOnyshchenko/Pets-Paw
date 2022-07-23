import './SideBar.css';
import { Link, useLocation } from 'react-router-dom';
import ToggleTheme from '../ToggleTheme/ToggleTheme';
import logo from '../../image/icons/logo.svg';
import vote from '../../image/vote-table.png';
import breed from '../../image/pet-breeds.png';
import search from '../../image/images-search.png';
import { useEffect } from 'react';

export default function SideBar() {
   const location = useLocation();

   useEffect(() => {
      removeActivePage();
      closeSideBar();
      if (location.pathname === '/gallery') {
         const link = document.getElementById('/gallery');
         link.classList.add('nav-links__link--active');
      } else if (location.pathname === '/breed') {
         const link = document.getElementById('/breed');
         link.classList.add('nav-links__link--active');
      } else if (location.pathname === '/voting') {
         const link = document.getElementById('/voting');
         link.classList.add('nav-links__link--active');
      }
   }, [location]);

   const removeActivePage = () => {
      const links = document.querySelectorAll('.nav-links__link');
      links.forEach(link => link.classList.remove('nav-links__link--active'));
   };
   const closeSideBar = () => {
      document.querySelector('.side-bar').classList.remove('side-bar--active');
   };
   return (
      <div className="side-bar">
         <Link to="/" className="logo-link" onClick={removeActivePage}>
            <img className="logo-icon" src={logo} alt="logo" />
            PetsPaw
         </Link>
         <ToggleTheme />
         <button
            className="side-bar__btn-close-side-bar"
            type="button"
            onClick={closeSideBar}
         ></button>
         <div className="side-bar__text-box">
            <h1 className="side-bar__title">Hi intern!</h1>
            <p className="side-bar__text">Welcome to MI 2022 Front-end test</p>
            <h2 className="side-bar__titel-h2">Lets start using The Dog API</h2>
         </div>
         <nav className="nav-links">
            <Link to="/voting" className="nav-links__link" id="/voting">
               <div className="nav-links__img nav-links__img--vote">
                  <img width="100" height="125" src={vote} alt="vote-table" />
               </div>
               <button className="nav-links__btn" type="button">
                  voting
               </button>
            </Link>
            <Link to="/breed" className="nav-links__link" id="/breed">
               <div className="nav-links__img nav-links__img--breed">
                  <img width="117" height="163" src={breed} alt="pet-breeds" />
               </div>
               <button className="nav-links__btn" type="button">
                  breheds
               </button>
            </Link>
            <Link to="/gallery" className="nav-links__link" id="/gallery">
               <div className="nav-links__img nav-links__img--gallery">
                  <img
                     width="112"
                     height="190"
                     src={search}
                     alt="images-search"
                  />
               </div>
               <button className="nav-links__btn" type="button">
                  gallery
               </button>
            </Link>
         </nav>
      </div>
   );
}
