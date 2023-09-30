import { useState } from 'react';
import { signInWithGooglePopup, createUserDocumentFromAuth, auth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';

const defaultFormFields = {
    email:'',
    password:'',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password  } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        try{
            const { user } = await signInWithGooglePopup(); 
            await createUserDocumentFromAuth(user);
        }
        catch(error)
        {
            
        }
       
    }

    const signIn = async (event) => {
        event.preventDefault();

        try
        {
           const response = await signInAuthUserWithEmailAndPassword(email, password);
           console.log(response);
           resetFormFields();
        } catch(error) {
            switch(error.code)
            {
                case 'auth/user-not-found':
                    alert('user email not found');
                    break;
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                default:
                    console.log(error);
            }    
      }
        
    }

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={signIn}>

                <FormInput label="Email" name="email" type="email" onChange={handleChange}  value={email} required/>

                <FormInput label="Password" name="password" type="password" onChange={handleChange}  value={password} required/>

                <div className='buttons-container'>
                    <Button type = "submit"> Sign In</Button>
                    <Button type ="button" buttonType='google' onClick={signInWithGoogle}> Google Sign In</Button>
                </div> 
            </form>
        </div>
    )
}
 
export default SignInForm;