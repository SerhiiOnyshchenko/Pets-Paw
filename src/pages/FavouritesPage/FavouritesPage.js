import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import DefaultState from '../../components/DefaultState/DefaultState';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { PetsOperations } from '../../redux/pets';
import './FavouritesPage.css';
import { useDispatch } from 'react-redux';

export default function FavouritesPage() {
   const dispatch = useDispatch();

   const [breedImages, setBreedImages] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      fetchFavouritesImage();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const fetchFavouritesImage = async () => {
      setLoader(true);
      try {
         const { payload } = await dispatch(
            PetsOperations.getFavouritesImage()
         );

         const newDataArr = payload.map(el =>
            !el.breeds ? { ...el, breeds: [{}] } : el
         );
         setBreedImages(newDataArr);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   const removeFavouritesImage = async id => {
      await dispatch(PetsOperations.deleteFavouritesImage(id));

      try {
         await fetchFavouritesImage();
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Container>
         <SearchBar />
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
