import { Routes, Route, Link } from 'react-router-dom';
import logo from './image/icons/logo.svg';
import vote from './image/vote-table.png';
import breed from './image/pet-breeds.png';
import search from './image/images-search.png';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import VotingPage from './pages/VotingPage/VotingPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import BreedsPage from './pages/BreedsPage/BreedsPage';

export default function App() {
   const addActivePage = e => {
      removeActivePage();
      e.currentTarget.classList.add('link--active');
   };
   const removeActivePage = () => {
      const links = document.querySelectorAll('.link');
      links.forEach(link => link.classList.remove('link--active'));
   };
   return (
      <div className="App">
         <div className="Side-bar">
            <Link to="/" className="logo-link" onClick={removeActivePage}>
               <img className="logo-icon" src={logo} alt="logo" />
               PetsPaw
            </Link>
            <h1 className="Title">Hi intern!</h1>
            <p className="Text">Welcome to MI 2022 Front-end test</p>
            <h2 className="titel-h2">Lets start using The Cat API</h2>
            <nav className="nav">
               <Link to="voting" className="link" onClick={addActivePage}>
                  <div className="link-img link-img--vote">
                     <img src={vote} alt="vote-table" />
                  </div>

                  <button className="link-btn" type="button">
                     voting
                  </button>
               </Link>
               <Link to="breed" className="link" onClick={addActivePage}>
                  <div className="link-img link-img--breed">
                     <img src={breed} alt="pet-breeds" />
                  </div>

                  <button className="link-btn" type="button">
                     breheds
                  </button>
               </Link>
               <Link to="gallery" className="link" onClick={addActivePage}>
                  <div className="link-img link-img--gallery">
                     <img src={search} alt="images-search" />
                  </div>

                  <button className="link-btn" type="button">
                     gallery
                  </button>
               </Link>
            </nav>
         </div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="voting" element={<VotingPage />} />
            <Route path="breed" element={<BreedsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
         </Routes>
      </div>
   );
}
