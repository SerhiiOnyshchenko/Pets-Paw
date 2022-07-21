import { useState } from 'react';
import './ToggleTheme.css';

export default function ToggleTheme() {
   const [toggle, setToggle] = useState(true);

   const toggleTheme = () => {
      setToggle(!toggle);
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
