import './BreedsItem.css';

export default function BreedsItem({ url, name, click }) {
   return (
      <li className="breeds-item" onClick={click}>
         <img className="breeds-img" src={url} alt={name} />
         <div className="breeds-img-name">{name}</div>
      </li>
   );
}
