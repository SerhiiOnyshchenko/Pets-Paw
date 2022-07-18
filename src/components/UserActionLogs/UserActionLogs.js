import React from 'react';
import LogsItem from './LogsItem/LogsItem';

export default function UserActionLogs() {
   const logs = [
      { time: '22:35', id: 23, value: 1 },
      { time: '22:33', id: 24, value: 0 },
   ];
   return (
      <ul>
         {logs.map(log => (
            <LogsItem
               key={log.id}
               time={log.time}
               id={log.id}
               value={log.value}
            />
         ))}
      </ul>
   );
}
