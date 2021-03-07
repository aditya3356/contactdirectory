import React, { Component } from 'react';
import classes from './Title.css';

class Title extends Component {
    render(){
        return(
            <p className={classes.Heading}>Welcome to the Contact Directory</p>
        )
    }
};

export default Title;