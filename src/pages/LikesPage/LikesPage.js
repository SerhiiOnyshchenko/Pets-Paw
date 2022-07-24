import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import DefaultState from '../../components/DefaultState/DefaultState';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import { PetsOperations } from '../../redux/pets';
import './LikesPage.css';
import { useDispatch } from 'react-redux';

export default function LikesPage() {
   const dispatch = useDispatch();
   const [history, setHistory] = useState([]);
   const [loader, setLoader] = useState(false);
   const [breedImages, setBreedImages] = useState([]);

   useEffect(() => {
      histList();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const histList = async () => {
      setLoader(true);
      try {
         const { payload } = await dispatch(PetsOperations.getVoteHistory());
         setHistory(payload);
         const promiseLikesArr = [];
         for (const el of payload) {
            if (el.value === 1) {
               promiseLikesArr.push(PetsOperations.getImagesById(el.image_id));
            }
         }
         const likeArr = await Promise.all(promiseLikesArr);
         const newLikeArr = likeArr.map(el =>
            !el.breeds ? { ...el, breeds: [{}] } : el
         );
         setBreedImages(newLikeArr);
      } catch (err) {
         console.log(err);
      }
      setLoader(false);
   };

   const removeLikes = async id => {
      const [imgId] = history.filter(el => el.image_id === id);
      try {
         await dispatch(PetsOperations.deleteVoteImage(imgId.id));
         await histList();
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>likes</ButtonInfo>
            </div>
            {loader ? (
               <Loader />
            ) : breedImages.length === 0 ? (
               <DefaultState />
            ) : (
               <GalleryGrid
                  images={breedImages}
                  click={removeLikes}
                  showName={true}
               />
            )}
         </div>
      </Container>
   );
}
