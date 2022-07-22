import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getBreedImagesByName, getImagesById } from '../../services/api';
import './SearchPage.css';
import DefaultState from './../../components/DefaultState/DefaultState';
import BreedsGrid from '../../components/BreedsGrid/BreedsGrid';
import { useNavigate } from 'react-router-dom';

export default function SearchPage({ search, setSearch }) {
   const navigate = useNavigate();
   const [breedImages, setBreedImages] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      fetchImagesByName(search);
   }, [search]);

   const fetchImagesByName = async name => {
      setLoader(true);
      try {
         const data = await getBreedImagesByName(name);
         let showImages = [];
         for (const el of data) {
            if (el.reference_image_id) {
               showImages.push(await getImagesById(el.reference_image_id));
            }
         }
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
         <SearchBar search={search} setSearch={setSearch} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>search</ButtonInfo>
            </div>
            <div className="search-text">
               Search results for: <span className="search-name">{search}</span>
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
