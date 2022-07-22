import './BreedsGrid.css';
import BreedsItem from './BreedsItem/BreedsItem';

export default function BreedsGrid({ images, click }) {
   return (
      <ul className="breeds-items">
         {images.map(el => (
            <BreedsItem
               key={el.id}
               url={el.url}
               name={el.breeds[0]?.name || 'not name'}
               click={() => click(el.breeds[0]?.id)}
            />
         ))}
      </ul>
   );
}
