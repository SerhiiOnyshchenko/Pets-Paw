import { useNavigate } from 'react-router-dom';
import './BackButton.css';

export default function BackButton() {
   const navigate = useNavigate();
   return (
      <button
         className="back-button"
         type="button"
         onClick={() => navigate(-1)}
      ></button>
   );
}
