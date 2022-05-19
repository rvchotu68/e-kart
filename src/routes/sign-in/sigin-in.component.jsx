import {
  signInWithGooglePop,
  createUserDocumentWithAuth,
  signInWithGoogleRedirect,
  auth,
} from "../../utils/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";

const SignIn = () => {
  const signIn = async () => {
    const res = await signInWithGooglePop();
    const userDocRef = await createUserDocumentWithAuth(res.user);
  };

  useEffect(() => {
    getRedirectResult(auth).then((res) => {
      console.log(auth);
      console.log(res);
    });
  }, []);

  return (
    <div>
      <button onClick={signIn}>Sign In</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
