import './BackButton.css';

export default function BackButton({ click }) {
   return (
      <button className="back-button" type="button" onClick={click}></button>
   );
}
