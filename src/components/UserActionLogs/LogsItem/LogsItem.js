import './LogsItem.css';

function LogsItem({ id, time, value }) {
   return (
      <li className="log-item">
         <span className="log-time">{time}</span>Image ID:{' '}
         <span className="log-id"> {id} </span> was added to
         {value ? 'Likes' : 'Dislikes'}{' '}
      </li>
   );
}

export default LogsItem;
