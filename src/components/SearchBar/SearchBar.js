import './SearchBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MenuBurger from '../MenuBurger/MenuBurger';

export default function SearchBar({ search, setSearch, active }) {
   const navigate = useNavigate();
   const [inputSearch, setInputSearch] = useState('');
   const location = useLocation();

   useEffect(() => {
      removeActiveLink();
      if (location.pathname === '/likes') {
         const link = document.getElementById('/likes');
         link.classList.add('search-bar__nav-link--active');
      } else if (location.pathname === '/favourites') {
         const link = document.getElementById('/favourites');
         link.classList.add('search-bar__nav-link--active');
      } else if (location.pathname === '/dislikes') {
         const link = document.getElementById('/dislikes');
         link.classList.add('search-bar__nav-link--active');
      }
   }, [location]);

   useEffect(() => {
      const input = document.querySelector('.search-bar__input');
      const form = document.querySelector('.search-bar__form');
      input.addEventListener('focus', () => {
         form.style.border = '2px solid #ff868e';
      });
      input.addEventListener('blur', () => {
         form.style.border = '';
      });
   }, []);

   const handleSubmit = e => {
      e.preventDefault();
      if (inputSearch) {
         setSearch(inputSearch);
         setInputSearch('');
         navigate('/search');
      }
   };

   const removeActiveLink = () => {
      const arrLinks = document.querySelectorAll('.search-bar__nav-link');
      arrLinks.forEach(link =>
         link.classList.remove('search-bar__nav-link--active')
      );
   };

   return (
      <div className="search-bar__box">
         <MenuBurger />
         <form className="search-bar__form" onSubmit={handleSubmit}>
            <input
               className="search-bar__input"
               type="text"
               name="search"
               value={inputSearch}
               onChange={e => setInputSearch(e.target.value)}
               placeholder="Search for breeds by name"
            />
            <button className="search-bar__submit" type="submit"></button>
         </form>
         <nav className="search-bar__nav">
            <Link
               className="search-bar__nav-link search-bar__nav-link--likes"
               to="/likes"
               id="/likes"
            ></Link>
            <Link
               className="search-bar__nav-link search-bar__nav-link--favourites "
               to="/favourites"
               id="/favourites"
            ></Link>
            <Link
               className="search-bar__nav-link search-bar__nav-link--dislikes"
               to="/dislikes"
               id="/dislikes"
            ></Link>
         </nav>
      </div>
   );
}
