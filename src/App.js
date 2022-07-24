import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
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
import { useDispatch } from 'react-redux';
import { PetsOperations } from './redux/pets';

export default function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(PetsOperations.fetchCategories());
   }, [dispatch]);

   return (
      <div className="App">
         <SideBar />
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="voting" element={<VotingPage />} />
            <Route path="breed" element={<BreedsPage />}>
               <Route path=":breedId" element={<BreedInfo />} />
            </Route>
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="likes" element={<LikesPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="dislikes" element={<DislikesPage />} />
         </Routes>
      </div>
   );
}
