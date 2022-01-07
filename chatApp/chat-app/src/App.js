import react, { useState, useRef } from 'react';
// npm install firebase react-firebase-hooks
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCVlr89TPxsx94TWQ3ZuwV-6Pw1_hLwvvY",
  authDomain: "chat-app-7eade.firebaseapp.com",
  projectId: "chat-app-7eade",
  storageBucket: "chat-app-7eade.appspot.com",
  messagingSenderId: "894873701999",
  appId: "1:894873701999:web:4c020566139ff6ba6e479a"
});


const auth = firebase.auth();
const firestore = firebase.firestore();


function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  // const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  
  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    // dummy.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

        {/* <div ref={dummy}></div> */}
      </div>

      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
    </div>
  </>)
}

function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
