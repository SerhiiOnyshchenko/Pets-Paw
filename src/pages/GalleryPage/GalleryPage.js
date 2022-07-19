import { useEffect, useState } from 'react';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import ButtonSelect from './../../components/ButtonSelect/ButtonSelect';
import GalleryGrid from './../../components/GalleryGrid/GalleryGrid';
import ButtonUpload from '../../components/ButtonUpload/ButtonUpload';
import { getBreedImages } from '../../services/api';
import './GalleryPage.css';

export default function GalleryPage() {
   const [breedImages, setBreedImages] = useState([]);
   const [limit, setLimit] = useState('5 items per page');

   useEffect(() => {
      fetchBreeds();
   }, []);

   useEffect(() => {
      const numLimit = limit.split(' ')[0];
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
   let arrSelect = ['All breeds'];
   breedImages.forEach(el => arrSelect.push(el.name));
   const limites = [
      '5 items per page',
      '10 items per page',
      '15 items per page',
      '20 items per page',
   ];
   const orderArr = ['Random', 'Desc', 'Asc'];
   const typeArr = ['All', 'Static', 'Animated'];
   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>gallery</ButtonInfo>
               <ButtonUpload />
            </div>
            <div className="gallery-page-filter">
               <div className="filter-item">
                  <p className="filter-item-title">order</p>
                  <ButtonSelect
                     options={orderArr}
                     width={290}
                     bgcolor={'#ffffff'}
                     id={'order'}
                     setSort={() => {}}
                  />
               </div>
               <div className="filter-item">
                  <p className="filter-item-title">type</p>
                  <ButtonSelect
                     options={typeArr}
                     id={'type'}
                     width={290}
                     bgcolor={'#ffffff'}
                     setSort={() => {}}
                  />
               </div>
               <div className="filter-item">
                  <p className="filter-item-title">breed</p>
                  <ButtonSelect
                     options={arrSelect}
                     width={290}
                     id={'breed'}
                     bgcolor={'#ffffff'}
                     setSort={() => {}}
                  />
               </div>
               <div className="filter-item">
                  <p className="filter-item-title">limit</p>
                  <div style={{ display: 'flex' }}>
                     <ButtonSelect
                        options={limites}
                        width={240}
                        bgcolor={'#ffffff'}
                        id={'limit'}
                        setSort={setLimit}
                     />
                     <button className="btn-update" type="button"></button>
                  </div>
               </div>
            </div>
            <GalleryGrid images={breedImages} click={() => {}} />
         </div>
      </Container>
   );
}
