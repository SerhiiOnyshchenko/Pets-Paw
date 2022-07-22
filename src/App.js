import { Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './image/icons/logo.svg';
import vote from './image/vote-table.png';
import breed from './image/pet-breeds.png';
import search from './image/images-search.png';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import VotingPage from './pages/VotingPage/VotingPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import BreedsPage from './pages/BreedsPage/BreedsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import { useState, useEffect } from 'react';
import LikesPage from './pages/LikesPage/LikesPage';
import DislikesPage from './pages/DislikesPage/DislikesPage';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import ToggleTheme from './components/ToggleTheme/ToggleTheme';
import BreedInfo from './components/BreedInfo/BreedInfo';
import { getCategories } from './services/api';

export default function App() {
   const [searchText, setSearchText] = useState('');
   const [categories, setCategories] = useState([
      { id: 0, name: 'All breeds' },
   ]);
   const location = useLocation();

   useEffect(() => {
      fetchCategories();
   }, []);

   useEffect(() => {
      removeActivePage();
      if (location.pathname === '/gallery') {
         const link = document.getElementById('/gallery');
         link.classList.add('link--active');
      } else if (location.pathname === '/breed') {
         const link = document.getElementById('/breed');
         link.classList.add('link--active');
      } else if (location.pathname === '/voting') {
         const link = document.getElementById('/voting');
         link.classList.add('link--active');
      }
   }, [location]);

   const removeActivePage = () => {
      const links = document.querySelectorAll('.link');
      links.forEach(link => link.classList.remove('link--active'));
   };
   const fetchCategories = async () => {
      try {
         const data = await getCategories();
         const datArr = [...data].map(el => {
            return { id: el.id, name: el.name };
         });
         datArr.unshift({ id: 0, name: 'All breeds' });
         setCategories(datArr);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className="App">
         <div className="Side-bar">
            <Link to="/" className="logo-link" onClick={removeActivePage}>
               <img className="logo-icon" src={logo} alt="logo" />
               PetsPaw
            </Link>
            <ToggleTheme />
            <h1 className="Title">Hi intern!</h1>
            <p className="Text">Welcome to MI 2022 Front-end test</p>
            <h2 className="titel-h2">Lets start using The Dog API</h2>
            <nav className="nav">
               <Link to="voting" className="link" id="/voting">
                  <div className="link-img link-img--vote">
                     <img
                        width="100"
                        height="125"
                        src={vote}
                        alt="vote-table"
                     />
                  </div>

                  <button className="link-btn" type="button">
                     voting
                  </button>
               </Link>
               <Link to="breed" className="link" id="/breed">
                  <div className="link-img link-img--breed">
                     <img
                        width="117"
                        height="163"
                        src={breed}
                        alt="pet-breeds"
                     />
                  </div>

                  <button className="link-btn" type="button">
                     breheds
                  </button>
               </Link>
               <Link to="gallery" className="link" id="/gallery">
                  <div className="link-img link-img--gallery">
                     <img
                        width="112"
                        height="190"
                        src={search}
                        alt="images-search"
                     />
                  </div>

                  <button className="link-btn" type="button">
                     gallery
                  </button>
               </Link>
            </nav>
         </div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
               path="voting"
               element={
                  <VotingPage search={searchText} setSearch={setSearchText} />
               }
            />
            <Route
               path="breed"
               element={
                  <BreedsPage
                     search={searchText}
                     setSearch={setSearchText}
                     categories={categories}
                  />
               }
            >
               <Route path=":breedId" element={<BreedInfo />} />
            </Route>
            <Route
               path="gallery"
               element={
                  <GalleryPage
                     search={searchText}
                     setSearch={setSearchText}
                     categories={categories}
                  />
               }
            />
            <Route
               path="search"
               element={
                  <SearchPage search={searchText} setSearch={setSearchText} />
               }
            />
            <Route
               path="likes"
               element={
                  <LikesPage search={searchText} setSearch={setSearchText} />
               }
            />
            <Route
               path="favourites"
               element={
                  <FavouritesPage
                     search={searchText}
                     setSearch={setSearchText}
                  />
               }
            />
            <Route
               path="dislikes"
               element={
                  <DislikesPage search={searchText} setSearch={setSearchText} />
               }
            />
         </Routes>
      </div>
   );
}
