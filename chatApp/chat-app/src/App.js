// npm install firebase react-firebase-hooks
import fire from './firebase';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import OptionPage from './views/OptionPage';
import SignIn from './Component/SignIn';


function App() {
  const auth = fire.auth();
  const [user] = useAuthState(auth);
  
 
  return (
    <div className="App">
      <section>
        {user ? <OptionPage uid={user.uid}/> : <SignIn />}
      </section>
    </div>
  );
}

export default App;
