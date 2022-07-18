import './BreedInfo.css';

export default function BreedInfo({ url, attach }) {
   console.log(attach);
   return (
      <>
         <div className="breed-info-box">
            <img className="breed-info-img" height="360" src={url} alt="img" />
            <div className="breed-info-action">
               <div className="breed-info-circle"></div>
               <div className="breed-info-circle"></div>
               <div className="breed-info-circle"></div>
               <div className="breed-info-circle"></div>
               <div className="breed-info-circle"></div>
            </div>
         </div>
         <div className="breed-info-text">
            <h2 className="breed-info-name">{attach.name}</h2>
            <p className="breed-info-title">{attach.bred_for}</p>
            <div className="breed-info-flex">
               <div className="breed-info-temper">
                  <p>Temperament:</p>
                  <p className="breed-info-text-info">{attach.temperament}</p>
               </div>
               <div className="breed-info-anuther">
                  <p>
                     Height:{' '}
                     <span className="breed-info-text-info">
                        {attach.height.metric} cm
                     </span>
                  </p>
                  <p>
                     Weight:{' '}
                     <span className="breed-info-text-info">
                        {attach.weight.metric} kg
                     </span>
                  </p>
                  <p>
                     Life span:{' '}
                     <span className="breed-info-text-info">
                        {attach.life_span}
                     </span>
                  </p>
               </div>
            </div>
         </div>
      </>
   );
}
