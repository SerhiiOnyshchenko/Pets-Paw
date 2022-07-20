import './GalleryItem.css';

function GalleryItem({ url, name, click }) {
   return (
      <li className="gallery-item" onClick={click}>
         <img className="gallery-img" src={url} alt={name} />
         <div className="gallery-img-fav"></div>
      </li>
   );
}

export default GalleryItem;
