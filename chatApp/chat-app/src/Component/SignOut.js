import fire from '../firebase';

function SignOut() {
    const auth = fire.auth();

  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default SignOut; 