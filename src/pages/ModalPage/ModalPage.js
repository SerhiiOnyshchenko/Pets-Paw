import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './ModalPage.css';
import { PetsOperations } from '../../redux/pets';

export default function ModalPage({ onClose }) {
   const modalRoot = useRef(document.querySelector('#modal-root'));
   const [fileInput, setFileInput] = useState(null);
   const [successFile, setSuccessFile] = useState(false);
   const [errorFile, setErrorFile] = useState(false);
   const [uploading, setUploading] = useState(false);

   useEffect(() => {
      setSuccessFile(false);
      setErrorFile(false);
      window.addEventListener('keydown', closeModalEscKey);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const changeInput = evt => {
      const [file] = evt.target.files;
      setFileInput(file);
      setSuccessFile(false);
      setErrorFile(false);
   };

   const hendleUpload = async () => {
      setUploading(true);
      try {
         await PetsOperations.postImageFile(fileInput);
         setSuccessFile(true);
         setFileInput(null);
      } catch (error) {
         setErrorFile(true);
         console.log(error);
      }
      setUploading(false);
   };

   function closeModalEscKey(e) {
      if (e.target.className === 'App') {
         onClose();
      }
      if (e.code === 'Escape') {
         onClose();
         window.removeEventListener('keydown', closeModalEscKey);
      }
   }

   return createPortal(
      <div className="modal-page__backdrop" onClick={closeModalEscKey}>
         <div className="App">
            <div className="modal-page__content">
               <button
                  className="modal-page__btn-close"
                  type="button"
                  onClick={onClose}
               ></button>
               <h2 className="modal-page__title">
                  Upload a .jpg or .png Dog Image
               </h2>
               <p className="modal-page__pretitle">
                  Any uploads must comply with the{' '}
                  <a
                     className="modal-page__link"
                     href="https://thecatapi.com/privacy"
                  >
                     upload guidelines{' '}
                  </a>
                  or face deletion.
               </p>
               <div className="modal-page__drag-box">
                  <div
                     className={
                        errorFile
                           ? 'modal-page__drag modal-page__drag--error'
                           : 'modal-page__drag'
                     }
                  >
                     <p>
                        Drag here<span>your file or</span>
                     </p>
                     <p>
                        Click here<span>to upload</span>
                     </p>
                  </div>
                  {fileInput && (
                     <img
                        className="modal-page__file-img"
                        id="modalFileImg"
                        src={URL.createObjectURL(fileInput)}
                        alt={fileInput.name}
                     />
                  )}{' '}
                  <input
                     className="modal-page__input"
                     type="file"
                     accept=".jpg,.png"
                     onChange={changeInput}
                  ></input>
               </div>
               <div className="modal-page__text">
                  {fileInput
                     ? `Image File Name: ${fileInput.name}`
                     : 'No file selected'}
               </div>
               {fileInput &&
                  !errorFile &&
                  (uploading ? (
                     <button
                        className="modal-page__btn-loading"
                        type="button"
                        disabled={uploading}
                     >
                        <div className="modal-page__btn-icon-upload"></div>
                        uploading
                     </button>
                  ) : (
                     <button
                        className="modal-page__btn-upload"
                        type="button"
                        onClick={hendleUpload}
                     >
                        upload photo
                     </button>
                  ))}
               {successFile && (
                  <div className="modal-page__success">
                     <span className="modal-page__success--icon"></span>
                     Thanks for the Upload - Dog found!
                  </div>
               )}

               {errorFile && (
                  <div className="modal-page__success">
                     <span className="modal-page__error--icon"></span>
                     No Dog found - try a different one
                  </div>
               )}
            </div>
         </div>
      </div>,
      modalRoot.current
   );
}
