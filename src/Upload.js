import { Button } from '@material-ui/core'
import React, { useState, } from 'react'
import { storage, db } from './config'
import firebase from "firebase/app"
import "./upload.css"

function Upload({ username }) {

    const [image, setImage] = useState(null)
    const [caption, setcaption] = useState('')
    const [progress, setProgress] = useState(0)


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])

        }
        console.log(image)
    }


    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            }, (error) => {
                alert(error.message)
            }, () => {
                storage.ref('images').child(image.name).getDownloadURL().then(url => {
                    db.collection('post').add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        Caption: caption,
                        imageurl: url,
                        userName: username
                    })
                    setProgress(0)
                    setcaption('')
                    setImage()
                })
            }
        )
    }

    return (
        <div className="imageupload">
            <progress className="imageupload_progress" value={progress} max='100' />
            <input placeholder="Enter a caption"
                onChange={e => setcaption(e.target.value)}
                value={caption}
            />
            <input type='file' onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default Upload
