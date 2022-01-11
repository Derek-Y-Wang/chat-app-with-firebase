import fire from './firebase';
import firebase from 'firebase/compat/app';

const firestore = fire.firestore();

const getMessages = async () => {
    // sample cloud function getting all documents in messages collection
     const snapshot = await firestore
        .collection('messages')
        .get();
    return snapshot.docs.map(doc => doc.data());
    
}

const createNewChatRoom = async (uid) => {
    let roomCode = null;

    const roomRef = await firestore
        .collection('rooms')
        .add({})
        .then((data) => {
            roomCode = data.id;
        })
        .catch((error) => {
            console.error("Error writing new room: ", error);
        });

    await firestore.collection('rooms').doc(roomCode).set({
        roomId: roomCode,
        host: uid.uid,  
        startTime: firebase.firestore.FieldValue.serverTimestamp(),
    })

    await firestore.collection('rooms').doc(roomCode).collection('messages').add({"Server Message": "Messages Created"});
    await firestore.collection('rooms').doc(roomCode).collection('users').add({uid: uid.uid});

    return roomCode; 
};

const getChatRoomMessages = async(roomId) => {
    const snapshot = await firestore
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .get();
    return snapshot.docs.map(doc => doc.data())

}

const addUserToChatRoom = async(uid, roomId) => {
    const snapshot = await firestore
        .collection('rooms')
        .doc(roomId)
        .collection('users')
        .get();
    const data = snapshot.docs.map(doc => doc.data().uid);
    if (!(data.includes(uid))){
        await firestore 
            .collection('rooms')
            .doc(roomId)
            .collection('users')
            .add({uid: uid})
    }
}

export {
    createNewChatRoom,
    getMessages,
    getChatRoomMessages, 
    addUserToChatRoom
}