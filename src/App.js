import React, { useState, useEffect } from "react"
import './App.css';
import Post from '../src/Component/Post'
import { auth, db } from "./config";
import Modal from '@material-ui/core/Modal';
import { Button, Input, makeStyles } from "@material-ui/core";
import Upload from "./Upload";
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));






function App() {
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [open, setOpen] = useState(false)
  const [signInopen, setsignInOpen] = useState(false)


  useEffect(() => {
    db.collection('post').orderBy("timestamp", "desc").onSnapshot(Snapshot => {
      setPosts(Snapshot.docs.map(doc => ({ id: doc.id, post: doc.data() })))
    })
  }, [])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (authuser) {
      if (authuser) {
        console.log(authuser)
        setUser(authuser)
      } else {
        setUser(null)
      }
    });
    return () => {
      unsubscribe()
    }

  }, [user, username])

  const classes = useStyles()


  const signUp = (e) => {

    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        res.user.updateProfile({
          displayName: username
        })
        setUserName("")
        setEmail("")
        setPassword("")

      })
      .catch(function (error) {
        alert(error.message)
      });
  }

  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .then((doc) => {
        db.collection("Users").doc(doc.user.uid).set({
          Email: email,
          Password: password,
          userId: doc.user.uid
        })
      })
      .catch(function (error) {
        alert(error.message)
      });
    setsignInOpen(false)
  }


  return (
    <div className="app">
      <Modal
        open={open}
        onClose={() => setOpen(false)} >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signUp'>
            <center >
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />

            </center>
            <Input
              placeholder='userName'
              value={username}
              type="text"
              onChange={e => { setUserName(e.target.value) }}
            />
            <Input
              placeholder='Email'
              value={email}
              type="text"
              onChange={e => { setEmail(e.target.value) }}
            />
            <Input
              placeholder='password'
              value={password}
              type="password"
              onChange={e => { setPassword(e.target.value) }}
            />
            <Button type="submit" variant='contained' onClick={signUp}>SignUp</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={signInopen}
        onClose={() => setsignInOpen(false)} >
        <div style={modalStyle} className={classes.paper}>
          <form className='app_signUp'>
            <center >
              <img
                className="app_headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />

            </center>
            <Input
              placeholder='Email'
              value={email}
              type="text"
              onChange={e => { setEmail(e.target.value) }}
            />
            <Input
              placeholder='password'
              value={password}
              type="password"
              onChange={e => { setPassword(e.target.value) }}
            />
            <Button type="submit" variant='contained' onClick={signIn}>SignIn</Button>
          </form>
        </div>
      </Modal>

      <div className="app_header">
        <img
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        <div className="app_sinup">
          {user ?
            (<Button onClick={() => auth.signOut()} variant="contained">LogOut</Button>
            ) : (
              <div className="app_login">
                <Button onClick={() => setsignInOpen(true)} variant="contained">SigIn</Button>
                <Button onClick={() => setOpen(true)} variant="contained">SignUp</Button>
              </div>

            )
          }
        </div>
      </div>


      <div className="app_posts">
        <div className="app_postLeft">
          {
            posts.map(({ id, post }) => {
              return (
                <Post key={id} username={post.userName} user={user} caption={post.Caption} imageUrl={post.imageurl} postId={id} />
              )
            })
          }
        </div>
      </div>
      <div className="app_postRight">
        <InstagramEmbed
          clientAccessToken='<appId>|<clientToken>'
          url='https://instagr.am/p/Zw9o4/'
          maxWidth={375}
          hideCaption={false}
          containerTagName='div'
          injectScript
          protocol=''
          onLoading={() => { }}
          onSuccess={() => { }}
          onAfterRender={() => { }}
          onFailure={() => { }}
        />
      </div>

      {user?.displayName ? (<Upload username={user.displayName} />)
        :
        (<h3>Sorry You Need to Login to post Anything</h3>
        )}



      {/* <Post username="Alihaider" caption="YOOO it works" imageUrl="https://images.unsplash.com/photo-1625119161833-57f8a7009f7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=367&q=80" />
      <Post username="Mutlib" caption="how is it looking" imageUrl="https://images.unsplash.com/photo-1624431403074-c83ccfe2475f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
      <Post username="Huzaifa" caption="rate my photography" imageUrl="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" /> */}
    </div>
  );
}

export default App;

