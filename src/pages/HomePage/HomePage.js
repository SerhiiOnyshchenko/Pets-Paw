import Container from './../../components/Container/Container';
import s from './HomePage.module.css';

export default function HomePage() {
   return (
      <Container>
         <div className={s.rectangle}></div>
         <div className={s.img}></div>
      </Container>
   );
}
