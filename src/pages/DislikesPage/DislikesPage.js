import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import DefaultState from '../../components/DefaultState/DefaultState';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import {
   deleteVoteImage,
   getImagesById,
   getVoteHistory,
} from '../../services/api';
import './DislikesPage.css';

export default function DislikesPage({ search, setSearch }) {
   const [breedImages, setBreedImages] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      histList();
   }, []);

   const histList = async () => {
      setLoader(true);
      try {
         const data = await getVoteHistory();
         const promiseLikesArr = [];
         for (const el of data) {
            if (el.value === 0) {
               promiseLikesArr.push(getImagesById(el.image_id));
            }
         }
         const likeArr = await Promise.all(promiseLikesArr);
         setBreedImages(likeArr);
         setBreedImages(likeArr);
      } catch (err) {
         console.log(err);
      }
      setLoader(false);
   };

   const removeLikes = async id => {
      try {
         await deleteVoteImage(id);
         await histList();
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <Container>
         <SearchBar search={search} setSearch={setSearch} active={'dislikes'} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>dislikes</ButtonInfo>
            </div>
            {loader ? (
               <Loader />
            ) : breedImages.length === 0 ? (
               <DefaultState />
            ) : (
               <GalleryGrid images={breedImages} click={removeLikes} />
            )}
         </div>
      </Container>
   );
}
