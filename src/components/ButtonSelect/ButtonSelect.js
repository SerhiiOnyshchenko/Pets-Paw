import './ButtonSelect.css';

export default function ButtonSelect({ main, options, width, id, setSort }) {
   const selectMain = el => {
      hiddenOptions();
      setSort(el);
   };
   const showOptions = () => {
      const selectOptions = document.getElementById(id);
      selectOptions.classList.add('select__options--active');
   };
   const hiddenOptions = () => {
      const selectOptions = document.getElementById(id);
      selectOptions.classList.remove('select__options--active');
   };
   return (
      <div className="select__box" style={{ width: `${width}` }}>
         <div
            style={{ width: `${width}` }}
            className="select__main"
            onClick={showOptions}
         >
            <div className="select__main--title">{main}</div>
            <span className="select__main--dropdown"></span>
         </div>
         <div className="select__options" id={id}>
            {options.map(el => (
               <div
                  key={el}
                  className="select__option"
                  onClick={() => selectMain(el)}
               >
                  {el}
               </div>
            ))}
         </div>
      </div>
   );
}
