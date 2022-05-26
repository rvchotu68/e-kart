import  {SignUpFormContainer} from"./sign-up-form.styles.jsx";
import { useState } from "react";
import {
  createUserAuthUsingEmailAndPassword,
  createUserDocumentWithAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button,{BUTTON_TYPE_CLASSES} from "../button/button.component";
const defaultFormValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(defaultFormValues);

  const { displayName, email, password, confirmPassword } = formData;
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData(defaultFormValues);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) return;

    try {
      const { user } = await createUserAuthUsingEmailAndPassword(
        email,
        password
      );
      const result = await createUserDocumentWithAuth(user, { displayName });
      console.log(result);
      resetForm();
    } catch (err) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).")
        alert("Account already exists, Try with another account");
      resetForm();
    }
  };

  return (
    <SignUpFormContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          type="text"
          id="displayName"
          name="displayName"
          value={displayName}
          onChange={changeHandler}
          required
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={confirmPassword}
          onChange={changeHandler}
          required
        />
        <Button buttonType ={BUTTON_TYPE_CLASSES.inverted} type="submit">Sign up</Button>
      </form>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
