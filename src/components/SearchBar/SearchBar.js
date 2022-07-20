import './SearchBar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function SearchBar({ search, setSearch, active }) {
   const navigate = useNavigate();
   const [inputSearch, setInputSearch] = useState('');
   const location = useLocation();

   useEffect(() => {
      removeActiveLink();
      if (location.pathname === '/likes') {
         const link = document.getElementById('/likes');
         link.classList.add('SearchBar-nav__link--active');
      } else if (location.pathname === '/favourites') {
         const link = document.getElementById('/favourites');
         link.classList.add('SearchBar-nav__link--active');
      } else if (location.pathname === '/dislikes') {
         const link = document.getElementById('/dislikes');
         link.classList.add('SearchBar-nav__link--active');
      }
   }, [location]);

   useEffect(() => {
      const input = document.querySelector('.SearchBar-input');
      const form = document.querySelector('.SearchBar-form');
      input.addEventListener('focus', () => {
         form.style.border = '2px solid #ff868e';
         input.style.color = '#1d1d1d';
      });
      input.addEventListener('blur', () => {
         form.style.border = '';
         input.style.color = '';
      });
   }, []);

   const handleSubmit = e => {
      e.preventDefault();
      setSearch(inputSearch);
      setInputSearch('');
      navigate('/search');
   };

   const removeActiveLink = () => {
      const arrLinks = document.querySelectorAll('.SearchBar-nav__link');
      arrLinks.forEach(link =>
         link.classList.remove('SearchBar-nav__link--active')
      );
   };

   return (
      <div className="SearchBar-box">
         <form className="SearchBar-form" onSubmit={handleSubmit}>
            <input
               className="SearchBar-input"
               type="text"
               name="search"
               value={inputSearch}
               onChange={e => setInputSearch(e.target.value)}
               placeholder="Search for breeds by name"
            />
            <button className="SearchBar-submit" type="submit"></button>
         </form>
         <nav className="SearchBar-nav">
            <Link
               className="SearchBar-nav__link SearchBar-nav__link--likes"
               to="/likes"
               id="/likes"
            ></Link>
            <Link
               className="SearchBar-nav__link SearchBar-nav__link--favourites "
               to="/favourites"
               id="/favourites"
            ></Link>
            <Link
               className="SearchBar-nav__link SearchBar-nav__link--dislikes"
               to="/dislikes"
               id="/dislikes"
            ></Link>
         </nav>
      </div>
   );
}
