import { useState } from 'react';
import BackButton from '../../components/BackButton/BackButton';
import BreedsGrid from '../../components/BreedsGrid/BreedsGrid';
import ButtonInfo from '../../components/ButtonInfo/ButtonInfo';
import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import './SearchPage.css';

export default function SearchPage() {
   const [breedImages, setBreedImages] = useState([]);
   const [searchName, setSearchName] = useState('second');

   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>search</ButtonInfo>
            </div>
            <div className="search-text">
               Search results for:{' '}
               <span className="search-name">{searchName}</span>
            </div>
            <BreedsGrid images={breedImages} click={() => {}} />
         </div>
      </Container>
   );
}
