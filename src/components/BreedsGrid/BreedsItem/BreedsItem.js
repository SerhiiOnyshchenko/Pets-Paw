import './BreedsItem.css';

export default function BreedsItem({ url, name, click }) {
   return (
      <li className="breeds__item" onClick={click}>
         <img className="breeds__img" src={url} alt={name} />
         <div className="breeds__img-name">{name}</div>
      </li>
   );
}
