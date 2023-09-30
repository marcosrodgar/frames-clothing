import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../../utils/firebase/firebase.utils';
import SignUpForm from '../../sign-up-form/sign-up-form.component';


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
        <SignUpForm/>
      </div>
    )
  }


  export default SignIn;