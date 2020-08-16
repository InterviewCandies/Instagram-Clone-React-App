import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Post from "../Post/Post";
import "./Layout.css";
import { db } from "../../database/firebase";
import ImageUploader from "../../containers/ImageUploader/ImageUploader";
import InstagramEmbed from "react-instagram-embed";
function Layout() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              post: doc.data(),
            };
          })
        );
      });
  }, []);
  const handleChange = (user) => {
    setUser(user);
  };
  return (
    <div>
      <Navbar userChange={handleChange}></Navbar>

      <div className="layout__posts">
        <div className="layout__left">
          {posts.map(({ id, post }) => {
            return (
              <Post
                key={id}
                user={user?.displayName}
                postId={id}
                username={post.username}
                imageURL={post.imageURL}
                caption={post.caption}
              ></Post>
            );
          })}
          {user ? (
            <ImageUploader username={user.displayName}> </ImageUploader>
          ) : null}
        </div>
        <div classname="layout__right">
          <InstagramEmbed
            url="https://www.instagram.com/p/CD6gvXvFnJY/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          ></InstagramEmbed>
        </div>
      </div>
    </div>
  );
}

export default Layout;
