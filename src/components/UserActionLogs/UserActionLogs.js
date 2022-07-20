import React from 'react';
import LogsItem from './LogsItem/LogsItem';

export default function UserActionLogs({ history }) {
   return (
      <ul>
         {history.map(log => (
            <LogsItem
               key={log.id}
               time={log.created_at}
               id={log.image_id}
               value={log.value}
            />
         ))}
      </ul>
   );
}
