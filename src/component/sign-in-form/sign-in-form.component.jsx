import {SignInFormContainer,ButtonsContainer} from "./sign-in-form.styles.jsx";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
import {
  signInWithGooglePop,
  signInAuthUsingEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

const formDefaultValues = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formData, setFormData] = useState(formDefaultValues);
  const { email, password } = formData;

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await signInAuthUsingEmailAndPassword(email, password);
      console.log(res);
    } catch (err) {
      console.log(err.message);
      switch (err.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          alert(err.code);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePop();
      // const userDocRef = await createUserDocumentWithAuth(user);
      // console.log(userDocRef);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(formData);
  return (
    <SignInFormContainer>
      <h2>I already Have an account</h2>
      <span>Sign in with your email password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={changeHandler}
          required
        />
        <FormInput
          label="Password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={changeHandler}
          required
        />
        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
            SIGN IN
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </Button>
        </ButtonsContainer>
      </form>
    </SignInFormContainer>
  );
};

export default SignInForm;
