import { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import SearchBar from '../../components/SearchBar/SearchBar';
import './FavouritesPage.css';

export default function FavouritesPage({ search, setSearch }) {
   const [breedImages, setBreedImages] = useState([]);

   return (
      <Container>
         <SearchBar search={search} setSearch={setSearch} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>Favourites</ButtonInfo>
            </div>
            <GalleryGrid images={breedImages} click={() => {}} />
         </div>
      </Container>
   );
}
