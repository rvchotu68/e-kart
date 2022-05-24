import "./sign-in-form.styles.scss";
import FormInput from "../form-input/form-input.component";
import { useState } from "react";
import Button from "../button/button.component";
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
    <div className="sign-up-container">
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
        <div className="buttons-container">
          <Button buttonType="reverse" type="submit">
            SIGN IN
          </Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            SIGN IN WITH GOOGLE
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
