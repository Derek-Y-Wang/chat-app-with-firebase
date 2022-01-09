import React, { useState } from 'react';
import { createNewChatRoom, getMessages } from '../services';

const OptionPage = (uid) => { 
    const [joinCode, setJoinCode] = useState(false);

    const generateRoom = async () => {
        // cloud function to set up new room
        await createNewChatRoom(uid);
        // const msg = await getMessages();
        // console.log(msg);
    }

    return (
        <div>
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
                    <input></input>
                </div>
            )}
            
        </div>
    
    ); 
};

export default OptionPage; 