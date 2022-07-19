import './SearchBar.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function SearchBar() {
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

   const addActiveLink = e => {
      e.preventDefault();
      removeActiveLink();
      e.currentTarget.classList.add('SearchBar-nav__link--active');
   };
   const removeActiveLink = () => {
      const arrLinks = document.querySelectorAll('.SearchBar-nav__link');
      arrLinks.forEach(link =>
         link.classList.remove('SearchBar-nav__link--active')
      );
   };

   return (
      <div className="SearchBar-box">
         <form className="SearchBar-form" onSubmit={() => {}}>
            <input
               className="SearchBar-input"
               type="text"
               placeholder="Search for breeds by name"
            />
            <button className="SearchBar-submit" type="submit"></button>
         </form>
         <nav className="SearchBar-nav">
            <Link
               className="SearchBar-nav__link SearchBar-nav__link--likes"
               to="/likes"
               onClick={addActiveLink}
            ></Link>
            <Link
               className="SearchBar-nav__link SearchBar-nav__link--favourites "
               to="/favourites"
               onClick={addActiveLink}
            ></Link>
            <Link
               className="SearchBar-nav__link SearchBar-nav__link--dislikes"
               to="/dislikes"
               onClick={addActiveLink}
            ></Link>
         </nav>
      </div>
   );
}
