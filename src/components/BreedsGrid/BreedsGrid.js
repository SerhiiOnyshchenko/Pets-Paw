import './BreedsGrid.css';
import BreedsItem from './BreedsItem/BreedsItem';

export default function BreedsGrid({ images, click }) {
   return (
      <ul className="breeds-items">
         {images.map(el => (
            <BreedsItem
               key={el.id}
               url={el.image.url}
               name={el.name}
               click={click}
            />
         ))}
      </ul>
   );
}
