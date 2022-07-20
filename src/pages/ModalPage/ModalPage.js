import { useRef } from 'react';
import { createPortal } from 'react-dom';
import './ModalPage.css';

export default function ModalPage({ onClose }) {
   const modalRoot = useRef(document.querySelector('#modal-root'));
   return createPortal(
      <div className="modal-backdrop">
         <div className="App">
            <div className="modal-content">
               <button
                  className="modal-btn-close"
                  type="button"
                  onClick={onClose}
               ></button>
               <h2 className="modal-title">Upload a .jpg or .png Dog Image</h2>
               <p className="modal-pretitle">
                  Any uploads must comply with the upload guidelines or face
                  deletion.
               </p>
               <div className="modal-drag-box">
                  <div className="modal-drag">
                     Drag here<span>your file or</span>Click here
                     <span>to upload</span>
                  </div>
                  <div className="modal-text">No file selected</div>
                  <input
                     className="modal-input"
                     type="file"
                     accept=".jpg,.png"
                  ></input>
               </div>
               <button className="modal-btn-upload" type="button">
                  UPLOAD PHOTO
               </button>
               <div className="modal-success">
                  <span className="modal-success--icon"></span>
                  Thanks for the Upload - Cat found!
               </div>
               <div className="modal-success">
                  <span className="modal-arror--icon"></span>
                  No Cat found - try a different one
               </div>
            </div>
         </div>
      </div>,
      modalRoot.current
   );
}
