import React, { Component } from 'react';
import classes from './User.css';
import firebase from '../../utils/firebase';
import AddContact from '../AddContact/AddContact';
import ContactList from '../ContactList/ContactList';

class User extends Component {
    state = {
        contacts: []
    }

    componentDidMount() {
        this.fetchFromDatabase();
    }

    fetchFromDatabase = () => {
        this.setState({contacts: []});

        firebase.firestore().collection(firebase.auth().currentUser.uid).get().then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                    let docData = {...doc.data(), docId: doc.id};
                    this.setState((prevState) => {
                        return {contacts: [...prevState.contacts, docData]};
                    });
                })
            }).catch(error => {
                console.log(error);
            });
    }

    signOut = () => {
        firebase.auth().signOut()
                .then(() => {
                    console.log("Signed out");
                    this.props.history.push({
                        pathname: '/'
                    })
                })
                .catch(error => {
                    console.log(error);
                });
    }

    render(){
        return(
            <div className={classes.UserInfo}>
                <p className={classes.UserName}>Welcome, {this.props.location.state.userName}</p>
                <img src={this.props.location.state.photo} alt="profile-pic" className={classes.Photo} />
                <div className={classes.LogoutButton} onClick={this.signOut}>
                    <p className={classes.LogoutText}>
                        Sign out
                    </p>
                </div>
                <AddContact fetchFromDatabase={this.fetchFromDatabase} />
                {this.state.contacts.length>0 && <ContactList contacts={this.state.contacts} fetchFromDatabase={this.fetchFromDatabase} />}
            </div>
        );
    }
};

export default User;