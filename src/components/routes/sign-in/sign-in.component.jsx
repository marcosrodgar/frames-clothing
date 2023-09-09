import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils';

function SignIn() {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }
    return (
      <div>
        <div>
          <h1>Sign In Page</h1>
          <button onClick={logGoogleUser}> Sign in with Google Popup</button>
        </div>
      </div>
    )
  }

  export default SignIn;