import React from 'react';

const HelpBlock = ({displayed, children}) =>
    (displayed ? 
        <div className="help-block">
            {children}
        </div> :
        null
);

export default HelpBlock;