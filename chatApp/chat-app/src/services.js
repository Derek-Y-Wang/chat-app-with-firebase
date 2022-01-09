import fire from './firebase';
import firebase from 'firebase/compat/app';

const firestore = fire.firestore();

const createNewChatRoom = async (uid) => {
    const roomRef = await firestore
        .collection('rooms')
        .add({
            host: uid.uid,  
            startTime: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
            console.log("new room successfully written!");
        })
        .catch((error) => {
            console.error("Error writing new room: ", error);
        });

    // await firestore
    //     .collection('rooms')
    //     .doc(roomRef.id)
    //     .set({})
    //     .then(() => {
    //         console.log("message collection successfully written!");
    //     })
    //     .catch((error) => {
    //         console.error("Error writing message collection: ", error);
    //     });

};

const getMessages = async () => {
    // sample cloud function getting all documents in messages collection
     const snapshot = await firestore
        .collection('messages')
        .get();
    return snapshot.docs.map(doc => doc.data());
    
}

export {
    createNewChatRoom,
    getMessages
}