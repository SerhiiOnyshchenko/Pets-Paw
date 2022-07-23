import SideBar from '../SideBar/SideBar';
import './MenuBurger.css';

export default function MenuBurger() {
   const openSideBar = () => {
      document.querySelector('.side-bar').classList.add('side-bar--active');
   };
   return (
      <div className="menu-burger">
         <button
            className="menu-burger__btn-open-menu"
            type="button"
            onClick={openSideBar}
         ></button>
         <SideBar />
      </div>
   );
}
