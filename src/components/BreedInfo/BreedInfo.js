import './BreedInfo.css';
import ImageGallery from 'react-image-gallery';
import { useEffect, useState } from 'react';
import { votingRandomImage } from '../../services/api';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function BreedInfo() {
   const [selectedImg, setSelectedImg] = useState([]);
   const [loader, setLoader] = useState(true);
   const location = useLocation();

   useEffect(() => {
      if (location.pathname.split('/')[2]) {
         fetchBredByName(location.pathname.split('/')[2]);
      }
   }, [location.pathname]);

   const fetchBredByName = async breedId => {
      try {
         const data = await votingRandomImage(15, '', '', breedId);
         setSelectedImg(data);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   if (loader) {
      return <Loader />;
   }

   const { name, bred_for, temperament, life_span, height, weight } =
      selectedImg[0].breeds[0];

   let images = [];
   for (const img of selectedImg) {
      images.push({
         original: img.url,
         originalClass: 'breed-info__img',
         originalHeight: 360,
         bulletClass: 'breed-info__circle',
      });
   }
   return (
      <>
         <div className="breed-info__box">
            <ImageGallery
               items={images}
               showFullscreenButton={false}
               showThumbnails={false}
               showPlayButton={false}
               showNav={false}
               showBullets={true}
               autoPlay={true}
            />
         </div>
         <div className="breed-info__text">
            <h2 className="breed-info__name">{name}</h2>
            <p className="breed-info__title">{bred_for}</p>
            <div className="breed-info__flex">
               <div className="breed-info__temper">
                  <p>Temperament:</p>
                  <p className="breed-info__text-info">{temperament}</p>
               </div>
               <div className="breed-info__anuther">
                  <p>
                     Height:{' '}
                     <span className="breed-info__text-info">
                        {height.metric} cm
                     </span>
                  </p>
                  <p>
                     Weight:{' '}
                     <span className="breed-info__text-info">
                        {weight.metric} kg
                     </span>
                  </p>
                  <p>
                     Life span:{' '}
                     <span className="breed-info__text-info">{life_span}</span>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}
