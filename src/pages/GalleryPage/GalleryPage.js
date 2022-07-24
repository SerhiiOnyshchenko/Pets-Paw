import { useEffect, useState } from 'react';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import ButtonSelect from './../../components/ButtonSelect/ButtonSelect';
import GalleryGrid from './../../components/GalleryGrid/GalleryGrid';
import ButtonUpload from '../../components/ButtonUpload/ButtonUpload';
import './GalleryPage.css';
import { useSelector, useDispatch } from 'react-redux';
import ModalPage from '../ModalPage/ModalPage';
import Loader from '../../components/Loader/Loader';
import { PetsOperations, PetsSelectors } from '../../redux/pets';

export default function GalleryPage() {
   const dispatch = useDispatch();

   const categories = useSelector(PetsSelectors.getCategories);

   const [loader, setLoader] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [breedImages, setBreedImages] = useState([]);
   const [limit, setLimit] = useState('5 items per page');
   const [order, setOrder] = useState('Random');
   const [type, setType] = useState('All');
   const [breeds, setBreeds] = useState('All breeds');

   useEffect(() => {
      fetchBreeds();
   }, []);

   const fetchBreeds = async (limit = 5, order, type, breedId) => {
      setLoader(true);
      try {
         const data = await PetsOperations.votingRandomImage(
            limit,
            order,
            type,
            breedId
         );
         setBreedImages(data);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
   };

   const handleFavourites = async id => {
      const { payload } = await dispatch(PetsOperations.getFavouritesImage());
      for (const el of payload) {
         if (el.image_id === id) {
            dispatch(PetsOperations.deleteFavouritesImage(el.id));
            return;
         }
      }
      dispatch(PetsOperations.postFavouritesImage(id));
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

   const widthMobile = window.innerWidth;

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
         <SearchBar />
         <div className="page-box">
            <div className="page-top gallery-page__top">
               <BackButton />
               <ButtonInfo>gallery</ButtonInfo>
               <ButtonUpload click={() => setShowModal(true)} />
            </div>
            <div className="gallery-page__filter filter">
               <div className="filter__item">
                  <p className="filter__title">order</p>
                  <ButtonSelect
                     main={order}
                     options={orderArr}
                     width={widthMobile > 768 ? '290px' : '100%'}
                     id={'order'}
                     setSort={setOrder}
                  />
               </div>
               <div className="filter__item">
                  <p className="filter__title">type</p>
                  <ButtonSelect
                     main={type}
                     options={typeArr}
                     id={'type'}
                     width={widthMobile > 768 ? '290px' : '100%'}
                     setSort={setType}
                  />
               </div>
               <div className="filter__item">
                  <p className="filter__title">breed</p>
                  <ButtonSelect
                     main={breeds}
                     options={arrSelect}
                     width={widthMobile > 768 ? '290px' : '100%'}
                     id={'breed'}
                     setSort={setBreeds}
                  />
               </div>
               <div className="filter__item">
                  <p className="filter__title">limit</p>
                  <div className="filter__two-btn">
                     <ButtonSelect
                        main={limit}
                        options={limites}
                        width={widthMobile > 768 ? '240px' : '100%'}
                        id={'limit'}
                        setSort={setLimit}
                     />
                     <button
                        className="filter__btn-update"
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
