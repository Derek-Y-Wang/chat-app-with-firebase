import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState } from 'react';
import fire from '../firebase';
import ChatMessage from '../Component/ChatMessage';
import firebase from 'firebase/compat/app';
import SignOut from '../Component/SignOut';

function ChatRoom( { roomCode } ) {
  
    const auth = fire.auth();
    const firestore = fire.firestore();
    // const messagesRef = firestore.collection('messages');
    const messagesRef = firestore.collection('rooms').doc(roomCode).collection("messages");
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
    }

    const Back = () => {
        return <button>Back</button>
    } 

    return (
        <>
        <div>
            <header className='App-header'>
                <SignOut roomId={roomCode} uid={auth.currentUser.uid}/>
                <h1>{roomCode}</h1>
                <Back/>  
            </header>
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}

        </div>

        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
            <button type='submit'>Submit</button>
        </form>
        </>
    )
}

export default ChatRoom; 