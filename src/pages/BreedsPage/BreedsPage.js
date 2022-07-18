import './BreedsPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import GalleryGrid from '../../components/GalleryGrid/GalleryGrid';
import { useEffect, useState } from 'react';
import { getBreedImages, getBreedImagesByName } from '../../services/api';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import BreedInfo from './../../components/BreedInfo/BreedInfo';

export default function BreedsPage() {
   const [breedImages, setBreedImages] = useState([]);
   const [limit, setLimit] = useState('Limit: 5');
   const [attach, setAttach] = useState(0);

   useEffect(() => {
      fetchBreeds();
   }, []);

   useEffect(() => {
      const numLimit = limit.split(' ')[1];
      fetchBreeds(numLimit);
   }, [limit]);

   const fetchBreeds = async limit => {
      try {
         const data = await getBreedImages(limit);
         setBreedImages(data);
      } catch (error) {
         console.log(error);
      }
   };
   const fetchBredByName = async name => {
      if (name === 'All breeds') {
         const numLimit = limit.split(' ')[1];
         fetchBreeds(numLimit);
         return;
      }
      try {
         const [data] = await getBreedImagesByName(name);
         setAttach(data);
      } catch (error) {
         console.log(error);
      }
   };
   let arrSelect = ['All breeds'];
   breedImages.forEach(el => arrSelect.push(el.name));
   const limites = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];
   let [selectedImg] = breedImages.filter(img =>
      img.id === attach.id ? img : ''
   );
   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>breeds</ButtonInfo>
               {!attach ? (
                  <>
                     <ButtonSelect
                        options={arrSelect}
                        width={200}
                        id={'breeds'}
                        setSort={fetchBredByName}
                     />
                     <ButtonSelect
                        options={limites}
                        width={100}
                        id={'limit'}
                        setSort={setLimit}
                     />
                     <button className="btn-sort btn-sort--AZ"></button>
                     <button className="btn-sort btn-sort--ZA"></button>
                  </>
               ) : (
                  <ButtonInfo>{attach.id}</ButtonInfo>
               )}
            </div>
            {!attach ? (
               <GalleryGrid images={breedImages} click={fetchBredByName} />
            ) : (
               <BreedInfo url={selectedImg.image.url} attach={attach} />
            )}
         </div>
      </Container>
   );
}
