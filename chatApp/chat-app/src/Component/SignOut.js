import fire from '../firebase';
import { getChatRoomUsers, deleteChatRoom, deleteUserFromChatRoom } from '../services';

const SignOut = ({roomId, uid}) => {
  const auth = fire.auth();

  const handleSignOut = async() => {
    auth.signOut();
    if (roomId){
      await deleteUserFromChatRoom(roomId, uid);
    }
    const numberInRooms = roomId ? await getChatRoomUsers() : null;
    if (numberInRooms && numberInRooms.length === 0){
      await deleteChatRoom(roomId);
    }
  }

  return auth.currentUser && (
    <button onClick={() => handleSignOut()}>Sign Out</button>
  )
}

export default SignOut; 