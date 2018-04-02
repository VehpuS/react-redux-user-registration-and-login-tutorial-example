import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import history from './_helpers/history';
import { alertActions } from './_actions/alert.actions';
import LoggedInRoute from './_components/LoggedInRoute.jsx';
import Alert from './_components/Alert.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';

const MainRouter = ({registrationPage}) => (
    <Router history={history}>
        <div className="current-route">
            <LoggedInRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={registrationPage} />
        </div>
    </Router>
);

class StaticApp extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });

        this.registrationPage = RegisterPage(this.props.registrationMethods);
    }

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Alert />
                        <MainRouter registrationPage={this.registrationPage} />
                    </div>
                </div>
            </div>
        );
    }
}

const App = connect(null)(StaticApp);

export default App;