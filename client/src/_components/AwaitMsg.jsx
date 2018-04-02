import React from 'react';

const AwaitMsg = ({isWaiting, children}) => (
    isWaiting ?
        <em>{children}</em> :
        null
);

export default AwaitMsg;