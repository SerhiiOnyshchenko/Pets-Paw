import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { getCategories, votingRandomImage } from '../../services/api';
import './BreedsPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import ButtonSelect from '../../components/ButtonSelect/ButtonSelect';
import BreedsGrid from '../../components/BreedsGrid/BreedsGrid';
import Loader from '../../components/Loader/Loader';

export default function BreedsPage({ search, setSearch }) {
   const navigate = useNavigate();
   const [breedImages, setBreedImages] = useState([]);
   const [limit, setLimit] = useState('Limit: 5');
   const [breeds, setBreeds] = useState('All breeds');
   const [selectedImg, setSelectedImg] = useState(0);
   const [order, setOrder] = useState('Random');
   const [categories, setCategories] = useState([
      { id: 0, name: 'All breeds' },
   ]);
   const [loader, setLoader] = useState(false);
   const location = useLocation();

   useEffect(() => {
      setSelectedImg(location.pathname.split('/')[2]);
   }, [location]);

   useEffect(() => {
      // fetchBreeds(5);
      fetchCategories();
   }, []);

   useEffect(() => {
      const numLimit = limit.split(' ')[1];
      let breedsId = '';
      if (breeds !== 'All breeds') {
         [breedsId] = categories.filter(el => el.name === breeds);
      }

      fetchBreeds(numLimit, breedsId.id, order);
   }, [limit, breeds, order]);

   const fetchBreeds = async (limit, breedId, order, type) => {
      setLoader(true);
      try {
         const data = await votingRandomImage(limit, order, type, breedId);
         setBreedImages(data);
      } catch (error) {
         console.log(error);
      }
      setLoader(false);
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

   const getImageId = breedId => {
      if (!breedId) {
         console.log('not name, not image');
         return;
      }
      setSelectedImg(breedId);
      navigate(`${breedId}`);
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
                  </>
               ) : (
                  <ButtonInfo>{selectedImg}</ButtonInfo>
               )}
            </div>
            {loader ? (
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
