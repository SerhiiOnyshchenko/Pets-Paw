import { useEffect, useState } from 'react';
import './ToggleTheme.css';

export default function ToggleTheme() {
   const [toggle, setToggle] = useState(true);
   const currentTheme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : null;

   useEffect(() => {
      if (currentTheme) {
         document.documentElement.setAttribute('data-theme', currentTheme);
         if (currentTheme === 'dark') {
            setToggle(false);
         }
      }
   }, [currentTheme]);

   const toggleTheme = () => {
      if (toggle) {
         document.documentElement.setAttribute('data-theme', 'dark');
         localStorage.setItem('theme', 'dark');
         setToggle(false);
      } else {
         document.documentElement.setAttribute('data-theme', 'light');
         localStorage.setItem('theme', 'light');
         setToggle(true);
      }
   };

   return (
      <div className="toggle-theme-box">
         <div
            className={
               toggle
                  ? 'toggle-theme-icon toggle-theme-icon--light'
                  : 'toggle-theme-icon toggle-theme-icon--dark'
            }
         ></div>
         <div className="toggle-theme-checked-box" onClick={toggleTheme}>
            <div
               className={toggle ? 'toggle-theme--light' : 'toggle-theme--dark'}
            ></div>
         </div>
      </div>
   );
}
