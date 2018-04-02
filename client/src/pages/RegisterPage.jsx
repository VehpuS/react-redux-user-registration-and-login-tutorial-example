import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
 
import { userActions } from '../_actions/user.actions';
import { alertActions } from '../_actions/alert.actions';
import AuthForm from '../_components/AuthForm.jsx';
import SpinningWheel from '../_components/SpinningWheel.jsx';
import FormField from '../_components/FormField.jsx';

const RegisterPage = (registrationMethods) => {
    class RegisterPage extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                user: {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: ''
                },
                submitted: false
            };

            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        handleChange(event) {
            const { name, value } = event.target;
            const { user } = this.state;
            this.setState({
                user: {
                    ...user,
                    [name]: value
                }
            });
        }

        handleSubmit(event) {
            event.preventDefault();

            this.setState({ submitted: true });
            const { user } = this.state;
            const { dispatch } = this.props;
            dispatch(alertActions.clear());
            if (user.firstName && user.lastName && user.username && user.password) {
                dispatch(userActions.register(user));
            } else {
                dispatch(alertActions.error("Required fields missing!"))
            }
        }

        render() {
            const { registering } = this.props;
            const { user, submitted } = this.state;
            return (
                <AuthForm title="Register">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <FormField
                            hasError={submitted && !user.firstName}
                            helpText="First Name is required">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        </FormField>
                        <FormField
                            hasError={submitted && !user.lastName}
                            helpText="Last Name is required">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        </FormField>
                        <FormField
                            hasError={submitted && !user.username}
                            helpText="Username is required">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        </FormField>
                        <FormField
                            hasError={submitted && !user.password}
                            helpText="Password is required">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        </FormField>
                        <FormField>
                            <button className="btn btn-primary">Register</button>
                            <SpinningWheel display={registering} />
                            <Link to="/login" className="btn btn-link">
                                Cancel
                            </Link>
                        </FormField>
                    </form>
                </AuthForm>
            );
        }
    }

    return connect(
        ({ registering }) => ({ registering }))
        (RegisterPage);
}


export default RegisterPage;