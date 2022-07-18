import './VotingPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';
import {
   postVoteImage,
   votingRandomImage,
   getVoteHistory,
} from './../../services/api';
import { useState, useEffect } from 'react';
import UserActionLogs from '../../components/UserActionLogs/UserActionLogs';

export default function VotingPage() {
   const [dataImg, setDataImg] = useState('');
   useEffect(() => {
      fetch();
   }, []);

   const fetch = async () => {
      try {
         const [data] = await votingRandomImage();
         setDataImg(data);
      } catch (err) {
         console.log(err);
      }
   };
   const likeDislike = async ans => {
      try {
         await postVoteImage(dataImg.id, ans);
         await fetch();
      } catch (err) {
         console.log(err);
      }
   };
   const histList = async () => {
      try {
         const { data } = await getVoteHistory();
         console.log(data);
      } catch (err) {
         console.log(err);
      }
   };
   return (
      <Container>
         <SearchBar />
         <div className="vote-box">
            <div className="vote-top">
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
                     onClick={() => likeDislike(1)}
                  ></button>
                  <button
                     className="img-action-btn img-action-btn--favorite"
                     type="button"
                     onClick={histList}
                  ></button>
                  <button
                     className="img-action-btn img-action-btn--dislike"
                     type="button"
                     onClick={() => likeDislike(0)}
                  ></button>
               </div>
            </div>
            <UserActionLogs />
         </div>
      </Container>
   );
}
