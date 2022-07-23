import SideBar from '../../components/SideBar/SideBar';
import Container from './../../components/Container/Container';
import './HomePage.css';

export default function HomePage() {
   return (
      <div className="home-page__side-bar">
         <SideBar />
         <div className="home-page__wrapper">
            <Container>
               <div className="home-page__rectangle"></div>
               <div className="home-page__img"></div>
            </Container>
         </div>
      </div>
   );
}
