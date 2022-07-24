import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import './SearchPage.css';
import DefaultState from './../../components/DefaultState/DefaultState';
import BreedsGrid from '../../components/BreedsGrid/BreedsGrid';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PetsOperations, PetsSelectors } from '../../redux/pets';

export default function SearchPage() {
   const navigate = useNavigate();
   const searchText = useSelector(PetsSelectors.getSearchText);

   const [breedImages, setBreedImages] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      fetchImagesByName(searchText);
   }, [searchText]);

   const fetchImagesByName = async name => {
      setLoader(true);
      try {
         const data = await PetsOperations.getBreedImagesByName(name);
         let promiseImages = [];
         for (const el of data) {
            if (el.reference_image_id) {
               promiseImages.push(
                  PetsOperations.getImagesById(el.reference_image_id)
               );
            }
         }
         const showImages = await Promise.all(promiseImages);
         setBreedImages(showImages);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   const handleImage = breedId => {
      navigate(`/breed/${breedId}`);
   };

   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>search</ButtonInfo>
            </div>
            <div className="search-page__text">
               Search results for:{' '}
               <span className="search-page__name">{searchText}</span>
            </div>
            {loader ? (
               <Loader />
            ) : breedImages.length === 0 ? (
               <DefaultState />
            ) : (
               <BreedsGrid images={breedImages} click={handleImage} />
            )}
         </div>
      </Container>
   );
}
