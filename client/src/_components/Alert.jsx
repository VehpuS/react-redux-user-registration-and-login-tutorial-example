import React from 'react';
import { connect } from 'react-redux';

const StaticAlert = ({ alert }) => (
    alert.message ? (
        <div className={`alert ${alert.type}`}>
            {alert.message}
        </div>
    ) : null
);

const Alert = connect(
    ({ alert }) => ({ alert }))
    (StaticAlert);

export default Alert;