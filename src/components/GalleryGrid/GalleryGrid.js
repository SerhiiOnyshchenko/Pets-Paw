import './GalleryGrid.css';
import GalleryItem from './GalleryItem/GalleryItem';

export default function GalleryGrid({ images, click, showName }) {
   return (
      <ul className="gallery__items">
         {images.map(el => (
            <GalleryItem
               key={el.id}
               url={el.url || el.image.url}
               name={el.breeds[0]?.name || 'not name'}
               show={showName}
               click={() => click(el.id)}
            />
         ))}
      </ul>
   );
}
