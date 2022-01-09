import fire from './firebase';

const firestore = fire.firestore();

const createNewChatRoom = async (uid) => {
    await firestore
        .collection('rooms')
        .add({
            host: uid    
        });
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