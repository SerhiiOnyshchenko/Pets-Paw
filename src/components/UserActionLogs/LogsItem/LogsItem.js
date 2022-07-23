import './LogsItem.css';

function LogsItem({ id, time, value }) {
   const logTime = new Date(time);
   const hh = String(logTime.getHours()).padStart(2, '0');
   const mm = String(logTime.getMinutes()).padStart(2, '0');
   return (
      <li className="log__item">
         <span className="log__text--table">
            <span className="log__time">{`${hh}:${mm}`}</span>
            <span className="log__text">
               Image ID: <span className="log__id">{id}</span> was added to{' '}
               {value ? 'Dislikes' : value === 1 ? 'Likes' : 'Favourite'}
            </span>
            {value === 0 ? (
               <span className="log__icon log__icon--dislike"></span>
            ) : value === 1 ? (
               <span className="log__icon log__icon--like"></span>
            ) : (
               <span className="log__icon log__icon--favourite"></span>
            )}
         </span>
         <span className="log__text log__text--mobile">
            Image ID: <span className="log__id">{id}</span> was added to{' '}
            {value ? 'Dislikes' : value === 1 ? 'Likes' : 'Favourite'}
         </span>
      </li>
   );
}

export default LogsItem;
