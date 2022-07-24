import { useEffect, useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import DefaultState from '../../components/DefaultState/DefaultState';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import Loader from '../../components/Loader/Loader';
import SearchBar from '../../components/SearchBar/SearchBar';
import './DislikesPage.css';
import { useDispatch } from 'react-redux';
import { PetsOperations } from '../../redux/pets';

export default function DislikesPage() {
   const dispatch = useDispatch();
   const [breedImages, setBreedImages] = useState([]);
   const [loader, setLoader] = useState(false);
   const [history, setHistory] = useState([]);
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
            if (el.value === 0) {
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
         <SearchBar active={'dislikes'} />
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
