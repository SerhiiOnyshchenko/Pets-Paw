import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { uploadFile } from '../../services/api';
import './ModalPage.css';

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
         await uploadFile(fileInput);
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
      <div className="modal-backdrop" onClick={closeModalEscKey}>
         <div className="App">
            <div className="modal-content">
               <button
                  className="modal-btn-close"
                  type="button"
                  onClick={onClose}
               ></button>
               <h2 className="modal-title">Upload a .jpg or .png Dog Image</h2>
               <p className="modal-pretitle">
                  Any uploads must comply with the{' '}
                  <a
                     className="modal-link"
                     href="https://thecatapi.com/privacy"
                  >
                     upload guidelines{' '}
                  </a>
                  or face deletion.
               </p>
               <div className="modal-drag-box">
                  <div
                     className={
                        errorFile
                           ? 'modal-drag modal-drag--error'
                           : 'modal-drag'
                     }
                  >
                     Drag here<span>your file or</span>Click here
                     <span>to upload</span>
                  </div>
                  {fileInput && (
                     <img
                        className="modal-file-img"
                        id="modalFileImg"
                        src={URL.createObjectURL(fileInput)}
                        alt={fileInput.name}
                     />
                  )}{' '}
                  <input
                     className="modal-input"
                     type="file"
                     accept=".jpg,.png"
                     onChange={changeInput}
                  ></input>
               </div>
               <div className="modal-text">
                  {fileInput
                     ? `Image File Name: ${fileInput.name}`
                     : 'No file selected'}
               </div>
               {fileInput &&
                  !errorFile &&
                  (uploading ? (
                     <button
                        className="modal-btn-loading"
                        type="button"
                        disabled={uploading}
                     >
                        <div className="modal-btn-icon-upload"></div>
                        uploading
                     </button>
                  ) : (
                     <button
                        className="modal-btn-upload"
                        type="button"
                        onClick={hendleUpload}
                     >
                        upload photo
                     </button>
                  ))}
               {successFile && (
                  <div className="modal-success">
                     <span className="modal-success--icon"></span>
                     Thanks for the Upload - Cat found!
                  </div>
               )}

               {errorFile && (
                  <div className="modal-success">
                     <span className="modal-error--icon"></span>
                     No Cat found - try a different one
                  </div>
               )}
            </div>
         </div>
      </div>,
      modalRoot.current
   );
}
