import './ButtonUpload.css';

export default function ButtonUpload({ click }) {
   return (
      <button className="btn-upload" type="button" onClick={click}>
         <span className="btn-upload-icon"></span>
         upload
      </button>
   );
}
