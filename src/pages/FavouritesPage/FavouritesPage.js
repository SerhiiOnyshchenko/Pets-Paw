import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import DefaultState from '../../components/DefaultState/DefaultState';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { deleteFavouritesImage, getFavouritesImage } from '../../services/api';
import './FavouritesPage.css';

export default function FavouritesPage({ search, setSearch }) {
   const [breedImages, setBreedImages] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      fetchFavouritesImage();
   }, []);

   const fetchFavouritesImage = async () => {
      setLoader(true);
      try {
         const data = await getFavouritesImage();
         const newDataArr = data.map(el =>
            !el.breeds ? { ...el, breeds: [{}] } : el
         );
         setBreedImages(newDataArr);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   const removeFavouritesImage = async id => {
      try {
         await deleteFavouritesImage(id);
         await fetchFavouritesImage();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container>
         <SearchBar search={search} setSearch={setSearch} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>Favourites</ButtonInfo>
            </div>
            {loader ? (
               <Loader />
            ) : breedImages.length === 0 ? (
               <DefaultState />
            ) : (
               <GalleryGrid
                  images={breedImages}
                  click={removeFavouritesImage}
               />
            )}
         </div>
      </Container>
   );
}
