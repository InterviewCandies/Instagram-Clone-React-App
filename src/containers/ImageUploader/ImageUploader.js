import React, { useState } from "react";
import { Input, Button, LinearProgress } from "@material-ui/core";
import { storage, db } from "../../database/firebase";
import firebase from "firebase";
import "./ImageUploader.css";
function ImageUploader({ username }) {
  const [caption, setCaption] = useState("");
  const [image, SetImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      SetImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username,
              caption,
              imageURL: url,
            });
            setCaption("");
            SetImage(null);
            setProgress(0);
          });
      }
    );
  };
  return (
    <div>
      <form className="imageUploader__container">
        <LinearProgress
          className="imageUploader__input"
          value={progress}
          variant="determinate"
        ></LinearProgress>
        <Input
          className="imageUploader__input"
          type="text"
          placeholder="Add caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></Input>
        <div className="imageUploader__group">
          <Input
            className="imageUploader__input"
            type="file"
            onChange={handleChange}
          ></Input>
          <Button onClick={handleUpload}>Send</Button>
        </div>
      </form>
    </div>
  );
}

export default ImageUploader;
