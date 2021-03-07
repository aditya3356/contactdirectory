import React, { Component } from 'react';
import classes from './ContactList.css';
import profilePhoto from '../../resources/profile-pic.webp';
import crossIcon from '../../resources/cross-icon.png';
import firebase from '../../utils/firebase';

class ContactList extends Component {

    deleteFromDatabase = (docId, photoName) => {
        firebase.firestore().collection(firebase.auth().currentUser.uid).doc(docId).delete().then(() => {
            console.log('Doc Removed');
            this.props.fetchFromDatabase();
            if (photoName!="")
            {
                const storageRef = firebase.storage().ref();
                const photoRef = storageRef.child(photoName);
                photoRef.delete().then(() => {
                    console.log("Photo deleted from Cloud Storage");
                  }).catch(error => {
                    console.log(error);
                  });
            }
            else
                console.log("No photo to delete from Cloud Storage");
        }).catch(error=>{
            console.log(error);
        });
    }

    render(){
        let contactList = this.props.contacts.map((contact, idx) => {

            let photoURL = profilePhoto;
            if (contact.photoURL!="")
                photoURL = contact.photoURL;

            return(
                <div className={classes.Contact} key={idx}>
                    <div className={classes.ContactInfo}>
                        <img src={photoURL} alt="profile-pic" className={classes.ProfilePic} />
                    </div>
                    <div className={classes.ContactInfo}>
                        {contact.name}
                    </div>
                    <div className={classes.ContactInfo}>
                        {contact.phone}
                    </div>
                    <img src={crossIcon} alt="cross-icon" className={classes.CrossIcon} onClick={() => {this.deleteFromDatabase(contact.docId, contact.photoName)}} />
                </div>
            );
        })

        let heading = (
            <div className={classes.Heading}>
                <div className={classes.HeadingInfo}>
                    Photo
                </div>
                <div className={classes.HeadingInfo}>
                    Name
                </div>
                <div className={classes.HeadingInfo}>
                    Phone no.
                </div>
            </div>
        );

        return(
            <div className={classes.ContactTable}>
                {heading}
                {contactList}
            </div>
        )
    }
};

export default ContactList;