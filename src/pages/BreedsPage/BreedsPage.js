import './BreedsPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import BreedsGrid from '../../components/BreedsGrid/BreedsGrid';
import { useEffect, useState } from 'react';
import {
   getBreedImages,
   getBreedImagesByName,
   getCategories,
   getImagesById,
} from '../../services/api';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import BreedInfo from './../../components/BreedInfo/BreedInfo';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BreedsPage({ search, setSearch }) {
   const navigate = useNavigate();
   const [breedImages, setBreedImages] = useState([]);
   const [limit, setLimit] = useState('Limit: 5');
   const [breeds, setBreeds] = useState('All breeds');
   const [selectedImg, setSelectedImg] = useState(0);
   const [categories, setCategories] = useState([
      { id: 0, name: 'All breeds' },
   ]);

   const location = useLocation();

   useEffect(() => {
      if (location.pathname === '/breed' && !location.hash) {
         setSelectedImg(0);
      }
   }, [location]);

   useEffect(() => {
      fetchBreeds();
      fetchCategories();
   }, []);

   useEffect(() => {
      const numLimit = limit.split(' ')[1];
      fetchBreeds(numLimit);
   }, [limit]);

   useEffect(() => {
      fetchBredByName(breeds);
   }, [breeds]);

   const fetchBreeds = async limit => {
      try {
         const data = await getBreedImages(limit);
         setBreedImages(data);
      } catch (error) {
         console.log(error);
      }
   };

   const fetchCategories = async () => {
      try {
         const data = await getCategories();
         const datArr = [...data].map(el => {
            return { id: el.id, name: el.name };
         });
         datArr.unshift({ id: 0, name: 'All breeds' });
         setCategories(datArr);
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
         setSelectedImg(await getImagesById(data.reference_image_id));
         navigate(`#${data.id}`);
      } catch (error) {
         console.log(error);
      }
   };
   const arrSelect = [...categories].map(el => el.name);
   const limites = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];

   return (
      <Container>
         <SearchBar search={search} setSearch={setSearch} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>breeds</ButtonInfo>
               {!selectedImg ? (
                  <>
                     <ButtonSelect
                        main={breeds}
                        options={arrSelect}
                        width={200}
                        id={'breeds'}
                        setSort={setBreeds}
                     />
                     <ButtonSelect
                        main={limit}
                        options={limites}
                        width={100}
                        id={'limit'}
                        setSort={setLimit}
                     />
                     <button
                        className="btn-sort btn-sort--AZ"
                        type="button"
                        onClick={() => {}}
                     ></button>
                     <button
                        className="btn-sort btn-sort--ZA"
                        type="button"
                        onClick={() => {}}
                     ></button>
                  </>
               ) : (
                  <ButtonInfo>{selectedImg.breeds[0].id}</ButtonInfo>
               )}
            </div>
            {!selectedImg ? (
               <BreedsGrid images={breedImages} click={fetchBredByName} />
            ) : (
               <BreedInfo
                  url={selectedImg.url}
                  selectedImg={selectedImg.breeds[0]}
               />
            )}
         </div>
      </Container>
   );
}
