import './VotingPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import {
   postVoteImage,
   votingRandomImage,
   getVoteHistory,
   postFavouritesImage,
   getFavouritesImage,
} from './../../services/api';
import { useState, useEffect } from 'react';
import UserActionLogs from '../../components/UserActionLogs/UserActionLogs';

export default function VotingPage({ search, setSearch }) {
   const [dataImg, setDataImg] = useState('');
   const [historyLikeDislike, setHistoryLikeDislike] = useState([]);
   const [historyFavourit, setHistoryFavourit] = useState([]);
   const [showHistory, setShowHistory] = useState([]);

   useEffect(() => {
      fetchVoteImage();
      histList();
      fetchFavouritesImage();
      sortHistory();
   }, []);

   useEffect(() => {
      sortHistory();
   }, [historyFavourit, historyLikeDislike]);

   const sortHistory = () => {
      const history = [...historyLikeDislike, ...historyFavourit];
      history.sort((a, b) => {
         let da = new Date(a.created_at),
            db = new Date(b.created_at);
         return db - da;
      });
      setShowHistory(history.slice(0, 5));
   };

   const fetchVoteImage = async () => {
      try {
         const [data] = await votingRandomImage();
         setDataImg(data);
      } catch (err) {
         console.log(err);
      }
   };

   const likeDislike = async value => {
      try {
         await postVoteImage(dataImg.id, value);
         await fetchVoteImage();
         await histList();
      } catch (err) {
         console.log(err);
      }
   };

   const handleFavourites = async () => {
      try {
         await postFavouritesImage(dataImg.id);
         await fetchFavouritesImage();
      } catch (err) {
         console.log(err);
      }
   };

   const fetchFavouritesImage = async () => {
      try {
         const data = await getFavouritesImage(5);
         setHistoryFavourit(data);
      } catch (err) {
         console.log(err);
      }
   };

   const histList = async () => {
      try {
         const data = await getVoteHistory(5);
         setHistoryLikeDislike(data);
      } catch (err) {
         console.log(err);
      }
   };

   return (
      <Container>
         <SearchBar search={search} setSearch={setSearch} />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>voting</ButtonInfo>
            </div>
            <div className="img-box">
               <img
                  className="random-img"
                  height="360"
                  src={dataImg.url}
                  alt="img"
               />
               <div className="img-action">
                  <button
                     className="img-action-btn img-action-btn--like"
                     type="button"
                     onClick={() => likeDislike(true)}
                  ></button>
                  <button
                     className="img-action-btn img-action-btn--favorite"
                     type="button"
                     onClick={handleFavourites}
                  ></button>
                  <button
                     className="img-action-btn img-action-btn--dislike"
                     type="button"
                     onClick={() => likeDislike(false)}
                  ></button>
               </div>
            </div>
            <UserActionLogs history={showHistory} />
         </div>
      </Container>
   );
}
