import './GalleryItem.css';

function GalleryItem({ url, name, click, show }) {
   return (
      <li className="gallery__item" onClick={click}>
         <img className="gallery__img" src={url} alt={name} />
         {show ? (
            <div className="gallery__img-name">{name}</div>
         ) : (
            <div className="gallery__img-fav"></div>
         )}
      </li>
   );
}

export default GalleryItem;
