import './VotingPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import { useState, useEffect } from 'react';
import UserActionLogs from '../../components/UserActionLogs/UserActionLogs';
import Loader from './../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { PetsOperations, PetsSelectors } from '../../redux/pets';

export default function VotingPage() {
   const votingImage = useSelector(PetsSelectors.getVotingImage);
   const isLoading = useSelector(PetsSelectors.getIsLoading);
   const dispatch = useDispatch();

   const [historyLikeDislike, setHistoryLikeDislike] = useState([]);
   const [historyFavourit, setHistoryFavourit] = useState([]);
   const [showHistory, setShowHistory] = useState([]);

   useEffect(() => {
      dispatch(PetsOperations.fetchVotingImage({}));
   }, [dispatch]);

   useEffect(() => {
      fetchHistoryList();
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

   const likeDislike = async value => {
      await dispatch(
         PetsOperations.postVoteImage({ id: votingImage.id, value })
      );
      dispatch(PetsOperations.fetchVotingImage({}));
      fetchHistoryList();
   };

   const handleFavourites = () => {
      dispatch(PetsOperations.postFavouritesImage(votingImage.id));
      dispatch(PetsOperations.fetchVotingImage({}));
      fetchFavouritesImage();
   };

   const fetchFavouritesImage = async () => {
      const { payload } = await dispatch(PetsOperations.getFavouritesImage(5));
      setHistoryFavourit(payload);
   };

   const fetchHistoryList = async () => {
      const { payload } = await dispatch(PetsOperations.getVoteHistory(5));
      setHistoryLikeDislike(payload);
   };

   return (
      <Container>
         <SearchBar />
         <div className="page-box">
            <div className="page-top">
               <BackButton />
               <ButtonInfo>voting</ButtonInfo>
            </div>
            {isLoading ? (
               <Loader />
            ) : (
               <>
                  <div className="vote-page__img-box">
                     <img
                        className="vote-page__img-random"
                        height="360"
                        src={votingImage.url}
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
