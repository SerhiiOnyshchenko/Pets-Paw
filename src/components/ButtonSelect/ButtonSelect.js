import './ButtonSelect.css';
import { useState } from 'react';

export default function ButtonSelect({ options, width, id, setSort }) {
   const [main, setMain] = useState(options[0]);
   const selectMain = el => {
      setMain(el);
      hiddenOptions();
      setSort(el);
   };
   const showOptions = () => {
      const selectOptions = document.getElementById(id);
      selectOptions.classList.add('Select-options--active');
   };
   const hiddenOptions = () => {
      const selectOptions = document.getElementById(id);
      selectOptions.classList.remove('Select-options--active');
   };
   return (
      <div className="Select-box">
         <div
            style={{ width: `${width}px` }}
            className="Select-main"
            onClick={showOptions}
         >
            <div className="Select-main--title">{main}</div>
            <span className="Select-main--dropdown"></span>
         </div>
         <div className="Select-options" id={id}>
            {options.map(el => (
               <div
                  key={el}
                  className="Select-option"
                  onClick={() => selectMain(el)}
               >
                  {el}
               </div>
            ))}
         </div>
      </div>
   );
}
