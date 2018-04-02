import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions/user.actions';
import AwaitMsg from '../_components/AwaitMsg.jsx';

const User = ({ user, handleDeleteUser }) => (
    <li key={user.id}>
        {user.firstName + ' ' + user.lastName}
        <AwaitMsg isWaiting={user.deleting}>
            Deleting...
        </AwaitMsg>
        {(!user.deleting && user.deleteError) ?
            <span className="error">
                ERROR: {user.deleteError}
            </span> :
            <span>
                <a onClick={handleDeleteUser(user.id)}>
                    -Delete
                </a>
            </span>}
    </li>
);;

const UsersList = ({ users, handleDeleteUser }) => (
    users.items ?
        <ul>
            {users.items.map((user) =>
                <User 
                    user={user}
                    key={user.id}
                    handleDeleteUser={handleDeleteUser} 
                    />)}
        </ul> :
        null
);

class StaticHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(userActions.getAll()) ;
    }
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id)) ;
    }
    render() {
        const { loggedInUser, users } = this.props;
        return (
            <div className="colmd6 colmdoffset3">
                <h1>Hi {loggedInUser.firstName } !</h1 >
                <h3>All registered users:</h3>
                <AwaitMsg isWaiting={users.loading}>Loading users...</AwaitMsg>
                <UsersList 
                    users={users} 
                    handleDeleteUser={this.handleDeleteUser}
                    />
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>);
    }
}

const HomePage = connect(
    ({ user, authentication }) => ({ loggedInUser: authentication.user, users: user }))
    (StaticHomePage);

export default HomePage;