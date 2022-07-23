import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import { getCategories } from './services/api';
import HomePage from './pages/HomePage/HomePage';
import VotingPage from './pages/VotingPage/VotingPage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import BreedsPage from './pages/BreedsPage/BreedsPage';
import SearchPage from './pages/SearchPage/SearchPage';
import LikesPage from './pages/LikesPage/LikesPage';
import DislikesPage from './pages/DislikesPage/DislikesPage';
import FavouritesPage from './pages/FavouritesPage/FavouritesPage';
import BreedInfo from './components/BreedInfo/BreedInfo';
import SideBar from './components/SideBar/SideBar';

export default function App() {
   const [searchText, setSearchText] = useState('');
   const [categories, setCategories] = useState([
      { id: 0, name: 'All breeds' },
   ]);

   useEffect(() => {
      fetchCategories();
   }, []);

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
         <SideBar />
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
