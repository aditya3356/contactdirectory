import React, { Component } from 'react';
import classes from './Home.css';
import Title from '../Title/Title';
import Login from '../Login/Login';
import phonebookIcon from '../../resources/phonebook-icon.png';

class Home extends Component {
    render() {
        return(
            <div className={classes.Home}>
                <img src={phonebookIcon} alt="phonebook" className={classes.Logo} />
                <Title />
                <Login />
            </div>
        )
    }
};

export default Home;