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
import Loader from './../../components/Loader/Loader';

export default function VotingPage({ search, setSearch }) {
   const [dataImg, setDataImg] = useState('');
   const [historyLikeDislike, setHistoryLikeDislike] = useState([]);
   const [historyFavourit, setHistoryFavourit] = useState([]);
   const [showHistory, setShowHistory] = useState([]);
   const [loader, setLoader] = useState(false);

   useEffect(() => {
      fetchVoteImage();
      histList();
      fetchFavouritesImage();
      sortHistory();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useEffect(() => {
      sortHistory();
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setLoader(true);
      try {
         const [data] = await votingRandomImage();
         setDataImg(data);
      } catch (err) {
         console.log(err);
      }
      setLoader(false);
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
         await fetchVoteImage();
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
            {loader ? (
               <Loader />
            ) : (
               <>
                  <div className="vote-page__img-box">
                     <img
                        className="vote-page__img-random"
                        height="360"
                        src={dataImg.url}
                        alt="img"
                     />
                     <div className="vote-page__img-action">
                        <button
                           className="vote-page__img-action-btn vote-page__img-action-btn--like"
                           type="button"
                           onClick={() => likeDislike(true)}
                        ></button>
                        <button
                           className="vote-page__img-action-btn vote-page__img-action-btn--favorite"
                           type="button"
                           onClick={handleFavourites}
                        ></button>
                        <button
                           className="vote-page__img-action-btn vote-page__img-action-btn--dislike"
                           type="button"
                           onClick={() => likeDislike(false)}
                        ></button>
                     </div>
                  </div>

                  <UserActionLogs history={showHistory} />
               </>
            )}
         </div>
      </Container>
   );
}
