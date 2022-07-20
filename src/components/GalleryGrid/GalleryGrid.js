import './GalleryGrid.css';
import GalleryItem from './GalleryItem/GalleryItem';

export default function GalleryGrid({ images, click }) {
   return (
      <ul className="gallery-items">
         {images.map(el => (
            <GalleryItem
               key={el.id}
               url={el.url || el.image.url}
               name={el.name}
               click={() => click(el.id)}
            />
         ))}
      </ul>
   );
}
