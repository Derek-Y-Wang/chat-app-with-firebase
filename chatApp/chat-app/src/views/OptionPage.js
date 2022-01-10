import React, { useState } from 'react';
import { createNewChatRoom, getMessages } from '../services';
import ChatRoom from './ChatRoom';

const OptionPage = (uid) => { 
    const [joinCode, setJoinCode] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false); 
    const [roomCode, setRoomCode] = useState(null);
    const [userInput, setUserInput] = useState('');

    const generateRoom = async () => {
        // cloud function to set up new room
        const roomCode = await createNewChatRoom(uid);
        setRoomCode(roomCode); 
        // const msg = await getMessages();
        // console.log(msg);
    }

    const onJoin = () => { 
        setJoinRoom(true);
        console.log(userInput); 
        setRoomCode(userInput); 
        setUserInput(''); 
    }

    return (
        <div>
            { 
            !joinRoom ? <div> 
                    {!joinCode && (
                        <div>
                            <button onClick={() => generateRoom()}>Create Room</button> 
                            <button onClick={() => setJoinCode(true)}>Join</button>
                        </div>
                    )}
                    {joinCode && (
                        <div>
                            <button onClick={() => setJoinCode(false)}>Back</button>
                            <h1>Room Code</h1>
                            <input value={userInput} onChange={(e) => setUserInput(e.target.value)}></input>
                            <button onClick={onJoin}>Join</button>
                        </div>
                    )}
                </div> : <ChatRoom roomCode={roomCode} /> 
            }
        </div>
    ); 
};

export default OptionPage; 