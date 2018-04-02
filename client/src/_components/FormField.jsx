import React from 'react';
import HelpBlock from './HelpBlock.jsx';

const FormField = ({ hasError=false, helpText="", children }) => (
  <div className={`form-group${hasError ? ' has-error' : ''}`}>
    {children}
    <HelpBlock display={hasError && helpText != ""}>
      {helpText}
    </HelpBlock>
  </div>
);

export default FormField;