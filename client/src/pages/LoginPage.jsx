import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { userActions } from '../_actions/user.actions';
import { authenticationActions } from '../_actions/authentication.actions'
import AuthForm from '../_components/AuthForm.jsx';
import SpinningWheel from '../_components/SpinningWheel.jsx';
import FormField from '../_components/FormField.jsx';

/*
The login page component renders a login form with username and password fields.
It displays validation messages for invalid fields when the user attempts to submit the form.
If the form is valid, submitting it causes the userActions.login(username, password) redux
action to be dispatched.
In the constructor() function the userActions.logout() redux action is dispatched which logs
the user out if they're logged in, this enables the login page to also be used as the logout
page.
*/

class StaticLoginPage extends React.Component {
    constructor(props) {
        super(props);
 
        // reset login status
        this.props.dispatch(authenticationActions.logout());
 
        this.state = {
            username: '',
            password: '',
            submitted: false
        };
 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
 
    handleSubmit(e) {
        e.preventDefault();
 
        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(authenticationActions.login(username, password));
        }
    }
 
    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <AuthForm title="Login">
                <form name="form" onSubmit={this.handleSubmit}>
                    <FormField 
                        hasError={submitted && !username}
                        helpText="Username is required">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                    </FormField>
                    <FormField 
                        hasError={submitted && !username}
                        helpText="Password is required">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                    </FormField>
                    <FormField>
                        <button className="btn btn-primary">Login</button>
                        <SpinningWheel display={loggingIn} />
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </FormField>
                </form>
            </AuthForm>
        );
    }
}
 
const LoginPage = connect(
    ({ authentication }) => ({ loggingIn: authentication.loggingIn }))
    (StaticLoginPage);

export default LoginPage;