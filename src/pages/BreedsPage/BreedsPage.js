import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './BreedsPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import BreedsGrid from '../../components/BreedsGrid/BreedsGrid';
import Loader from '../../components/Loader/Loader';
import { PetsOperations, PetsSelectors } from '../../redux/pets';
import { useSelector, useDispatch } from 'react-redux';

export default function BreedsPage() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const categories = useSelector(PetsSelectors.getCategories);
   const [limit, setLimit] = useState('Limit: 5');
   const [breeds, setBreeds] = useState('All breeds');
   const [order, setOrder] = useState('Random');

   const [breedImages, setBreedImages] = useState([]);
   const [selectedImg, setSelectedImg] = useState(0);
   const isLoader = useSelector(PetsSelectors.getIsLoading);

   useEffect(() => {
      setSelectedImg(location.pathname.split('/')[2]);
   }, [location]);

   useEffect(() => {
      const numLimit = limit.split(' ')[1];
      let breedsId = '';
      if (breeds !== 'All breeds') {
         [breedsId] = categories.filter(el => el.name === breeds);
      }

      fetchBreeds(numLimit, breedsId.id, order);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [limit, breeds, order]);

   const fetchBreeds = async (limit, breedId, order, type = '') => {
      const { payload } = await dispatch(
         PetsOperations.fetchVotingImage({
            limit,
            order,
            type,
            breedId,
         })
      );
      setBreedImages(payload);
   };

   const getImageId = breedId => {
      if (!breedId) {
         console.log('not name, not image');
         return;
      }
      setSelectedImg(breedId);
      navigate(`${breedId}`);
   };
   const widthMobile = window.innerWidth;
   const arrSelect = [...categories].map(el => el.name);
   const limites = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];

   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top breed-page__top">
               <BackButton />
               <ButtonInfo>breeds</ButtonInfo>
               {!selectedImg ? (
                  <>
                     <ButtonSelect
                        main={breeds}
                        options={arrSelect}
                        width={widthMobile > 768 ? '200px' : '100%'}
                        id={'breeds'}
                        setSort={setBreeds}
                     />
                     <div className="breed-page--mobile">
                        <ButtonSelect
                           main={limit}
                           options={limites}
                           width={
                              widthMobile > 768
                                 ? '100px'
                                 : widthMobile > 425
                                 ? '220px'
                                 : '150px'
                           }
                           id={'limit'}
                           setSort={setLimit}
                        />
                        <button
                           className={
                              order === 'Desc'
                                 ? 'btn-sort btn-sort--ZA--active'
                                 : 'btn-sort btn-sort--ZA'
                           }
                           type="button"
                           onClick={() => setOrder('Desc')}
                        ></button>
                        <button
                           className={
                              order === 'Asc'
                                 ? 'btn-sort btn-sort--AZ--active'
                                 : 'btn-sort btn-sort--AZ'
                           }
                           type="button"
                           onClick={() => setOrder('Asc')}
                        ></button>
                     </div>
                  </>
               ) : (
                  <ButtonInfo>{selectedImg}</ButtonInfo>
               )}
            </div>
            {isLoader ? (
               <Loader />
            ) : !selectedImg ? (
               <BreedsGrid images={breedImages} click={getImageId} />
            ) : (
               <Outlet />
            )}
         </div>
      </Container>
   );
}
