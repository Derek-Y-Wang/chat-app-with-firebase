// npm install firebase react-firebase-hooks
import fire from './firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import OptionPage from './views/OptionPage';
import SignIn from './Component/SignIn';
import SignOut from './Component/SignOut';
import ChatRoom from './views/CharRoom';


function App() {
  const auth = fire.auth();
  const [user] = useAuthState(auth);
  
  return (
    <div className="App">
      <header className="App-header">
        <SignOut />
      </header>
      <section>
        {user ? <ChatRoom/> : <SignIn />}
        {/* {user ? <OptionPage uid={user.uid}/> : <SignIn />} */}
      </section>
    </div>
  );
}

export default App;
