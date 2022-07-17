import './VotingPage.css';
import Container from './../../components/Container/Container';
import SearchBar from './../../components/SearchBar/SearchBar';
import BackButton from './../../components/BackButton/BackButton';
import ButtonInfo from './../../components/ButtonInfo/ButtonInfo';

export default function VotingPage() {
   return (
      <Container>
         <SearchBar />
         <div className="vote-box">
            <div className="vote-top">
               <BackButton />
               <ButtonInfo>voting</ButtonInfo>
            </div>
         </div>
      </Container>
   );
}
