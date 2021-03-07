import React, { Component } from 'react';
import classes from './AddContact.css';
import uploadingImage from '../../resources/uploading.gif';
import firebase from '../../utils/firebase';

class AddContact extends Component {

    state = {
        name: "",
        phone: "",
        photo: "",
        photoURL: "",
        photoName: "",
        uploading: false
    }

    nameChangeHandler = (event) => {
        this.setState({name: event.target.value});
    }

    phoneChangeHandler = (event) => {
        this.setState({phone: event.target.value});
    }

    photoChangeHandler = (event) => {
        this.setState({photo: event.target.files[0]});
    }

    uploadToStorage = () => {
        const file = this.state.photo;

        const storageRef = firebase.storage().ref();
        const fileName = firebase.auth().currentUser.uid + "/" + this.state.name + "-" + this.state.phone + "-" + file.name;
        const thisRef = storageRef.child(fileName);
  
        thisRef.put(file).then(snapshot => {
            console.log('Uploaded photo');
            storageRef.child(fileName).getDownloadURL().then(url=> {
                this.setState({photoURL: url, photoName: fileName}, () => {
                    this.uploadToFirestore();
                });
            }).catch(error=> {
                console.log(error);
            });
        }).catch(error => {
            console.log(error);
        });
    }

    uploadToFirestore = () => {
        firebase.firestore().collection(firebase.auth().currentUser.uid).add({
            name: this.state.name,
            phone: this.state.phone,
            photoURL: this.state.photoURL,
            photoName: this.state.photoName
        })
        .then(docRef => {
            this.setState({name: "", phone: "", photo: "", photoURL: "", photoName: "", uploading: false}, () => {
                this.props.fetchFromDatabase();        
            });
        })
        .catch(error => {
            console.error(error);
        });
    }

    addButtonClickHandler = (event) => {
        this.setState({uploading: true}, () => {
            if (this.state.photo!="")
                this.uploadToStorage();
            else
            {
                console.log("Photo not uploaded");
                this.uploadToFirestore();
            }
        });
    }

    render(){
        const disabled = this.state.name=="" || this.state.phone=="";
        let addButtonClass = classes.AddButton + " ";
        let wrapperClass = "";

        if (disabled)
        {
            wrapperClass+=classes.NotAllowedWrapper;
            addButtonClass+=classes.NotAllowed;
        }
        else
            addButtonClass+=classes.Allowed;
        
        let renderedContent = (
            <div className={classes.AddContact}>
                <div className={classes.Form}>
                    <input type="text" placeholder="Name" value={this.state.name} onChange={this.nameChangeHandler} className={classes.InputField} />
                    <input type="text" placeholder="Phone No." value={this.state.phone} onChange={this.phoneChangeHandler} className={classes.InputField} />
                    <div className={classes.FilePicker}>
                        <input type="file" placeholder="Photo" accept="image/*" onChange={this.photoChangeHandler} />
                        <p>Upload photo</p>
                    </div>
                </div>
                <div className={wrapperClass}>
                    <div className={addButtonClass} onClick={this.addButtonClickHandler}>
                        Add
                    </div>
                </div>
            </div>
        );

        if (this.state.uploading)
           renderedContent = <img src={uploadingImage} alt="Uploading data" className={classes.Uploading} /> 
  
        return(
            renderedContent
        )
    }
};

export default AddContact;