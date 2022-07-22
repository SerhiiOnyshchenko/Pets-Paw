import { useEffect, useState } from 'react';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import ButtonSelect from './../../components/ButtonSelect/ButtonSelect';
import GalleryGrid from './../../components/GalleryGrid/GalleryGrid';
import ButtonUpload from '../../components/ButtonUpload/ButtonUpload';
import {
   deleteFavouritesImage,
   getCategories,
   getFavouritesImage,
   postFavouritesImage,
   votingRandomImage,
} from '../../services/api';
import './GalleryPage.css';
import ModalPage from '../ModalPage/ModalPage';
import Loader from '../../components/Loader/Loader';

export default function GalleryPage({ search, setSearch }) {
   const [loader, setLoader] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [breedImages, setBreedImages] = useState([]);
   const [limit, setLimit] = useState('5 items per page');
   const [order, setOrder] = useState('Random');
   const [type, setType] = useState('All');
   const [breeds, setBreeds] = useState('All breeds');
   const [categories, setCategories] = useState([
      { id: '', name: 'All breeds' },
   ]);

   useEffect(() => {
      fetchBreeds();
      fetchCategories();
   }, []);

   const fetchBreeds = async (limit = 5, order, type, breedId) => {
      setLoader(true);
      try {
         const data = await votingRandomImage(limit, order, type, breedId);
         setBreedImages(data);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   const handleFavourites = async id => {
      const data = await getFavouritesImage();
      for (const el of data) {
         if (el.image_id === id) {
            await deleteFavouritesImage(el.id);
            return;
         }
      }
      try {
         await postFavouritesImage(id);
      } catch (err) {
         console.log(err);
      }
   };

   const fetchCategories = async () => {
      try {
         const data = await getCategories();
         const datArr = [...data].map(el => {
            return { id: el.id, name: el.name };
         });
         datArr.unshift({ id: '', name: 'All breeds' });
         setCategories(datArr);
      } catch (error) {
         console.log(error);
      }
   };

   const updateFilter = () => {
      const numLimit = limit.split(' ')[0];
      const typeArr = [];
      if (type === 'Static') {
         typeArr.push('jpg');
         typeArr.push('png');
      } else if (type === 'Animated') {
         typeArr.push('gif');
      } else {
         typeArr.push('');
      }
      const [breedID] = categories.filter(el => el.name === breeds);
      fetchBreeds(numLimit, order, typeArr, breedID?.id);
   };

   const arrSelect = [...categories].map(el => el.name);
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
         <SearchBar search={search} setSearch={setSearch} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>gallery</ButtonInfo>
               <ButtonUpload click={() => setShowModal(true)} />
            </div>
            <div className="gallery-page-filter">
               <div className="filter-item">
                  <p className="filter-item-title">order</p>
                  <ButtonSelect
                     main={order}
                     options={orderArr}
                     width={290}
                     id={'order'}
                     setSort={setOrder}
                  />
               </div>
               <div className="filter-item">
                  <p className="filter-item-title">type</p>
                  <ButtonSelect
                     main={type}
                     options={typeArr}
                     id={'type'}
                     width={290}
                     setSort={setType}
                  />
               </div>
               <div className="filter-item">
                  <p className="filter-item-title">breed</p>
                  <ButtonSelect
                     main={breeds}
                     options={arrSelect}
                     width={290}
                     id={'breed'}
                     setSort={setBreeds}
                  />
               </div>
               <div className="filter-item">
                  <p className="filter-item-title">limit</p>
                  <div style={{ display: 'flex' }}>
                     <ButtonSelect
                        main={limit}
                        options={limites}
                        width={240}
                        id={'limit'}
                        setSort={setLimit}
                     />
                     <button
                        className="btn-update"
                        type="button"
                        onClick={updateFilter}
                     ></button>
                  </div>
               </div>
            </div>
            {loader ? (
               <Loader />
            ) : (
               <GalleryGrid images={breedImages} click={handleFavourites} />
            )}
         </div>
         {showModal && <ModalPage onClose={() => setShowModal(false)} />}
      </Container>
   );
}
