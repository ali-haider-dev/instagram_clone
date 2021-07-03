import React, { useState, useEffect } from "react"
import './App.css';
import Post from '../src/Component/Post'
function App() {

  const [posts, setPosts] = useState([
    {
      username: "Alihaider",
      caption: "YOOO it works",
      imageUrl: "https://images.unsplash.com/photo-1625119161833-57f8a7009f7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=367&q=80"
    },
    {
      username: "Mutlib",
      caption: "how is it looking",
      imageUrl: "https://images.unsplash.com/photo-1624431403074-c83ccfe2475f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }

  ])
  return (
    <div className="app">
      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      <h1>Hello EverOne Lets Build Instagram Clone With ReactJS</h1>

      {
        posts.map(post => {
          return (
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        })
      }

      {/* <Post username="Alihaider" caption="YOOO it works" imageUrl="https://images.unsplash.com/photo-1625119161833-57f8a7009f7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=367&q=80" />
      <Post username="Mutlib" caption="how is it looking" imageUrl="https://images.unsplash.com/photo-1624431403074-c83ccfe2475f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
      <Post username="Huzaifa" caption="rate my photography" imageUrl="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" /> */}



    </div>
  );
}

export default App;
