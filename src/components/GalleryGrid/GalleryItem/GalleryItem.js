import './GalleryItem.css';

function GalleryItem({ url, name, click, show }) {
   return (
      <li className="gallery-item" onClick={click}>
         <img className="gallery-img" src={url} alt={name} />
         {show ? (
            <div className="gallery-img-name">{name}</div>
         ) : (
            <div className="gallery-img-fav"></div>
         )}
      </li>
   );
}

export default GalleryItem;
