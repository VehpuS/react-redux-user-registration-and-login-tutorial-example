import React from 'react';

const AuthForm = ({children, title}) => (
    <div className="col-md-6 col-md-offset-3">
        <h2>{title}</h2>
        {children}
    </div>
);

export default AuthForm;