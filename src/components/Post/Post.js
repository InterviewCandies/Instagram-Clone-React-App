import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import firebase from "firebase";
import "./Post.css";
import { db } from "../../database/firebase";
function Post({ postId, user, username, imageURL, caption }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [notSend, setNotSend] = useState(true);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, []);
  const handleComment = (e) => {
    e.preventDefault();
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user,
        text,
      })
      .catch((error) => {
        console.log(error);
      });
    setText("");
    setNotSend(true);
  };
  return (
    <div className="post__container">
      <header className="post__header">
        <Avatar
          className="post__avatar"
          src="https://images.unsplash.com/photo-1597179761147-08a63e7622ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt={username}
        ></Avatar>
        <h4>{username}</h4>
      </header>
      <div>
        <img className="post__image" src={imageURL} alt="post image"></img>
        <h4 className="post__text">
          <strong>{username}</strong> {caption}
        </h4>
      </div>
      <div>
        {comments.map((comment) => (
          <h4 className="post__text">
            <strong>{comment.username}</strong> {comment.text}
          </h4>
        ))}
      </div>
      {user && (
        <div className="post__comment">
          <input
            type="text"
            className="post__input"
            placeholder="Add comment"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value != "") setNotSend(false);
            }}
          ></input>
          <button
            className="post__button"
            onClick={(e) => handleComment(e)}
            disabled={notSend}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
