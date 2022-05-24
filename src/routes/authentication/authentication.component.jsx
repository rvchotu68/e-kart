// import {
//   signInWithGooglePop,
//   createUserDocumentWithAuth,
//   signInWithGoogleRedirect,
//   auth,
// } from "../../utils/firebase/firebase.utils";
// import { getRedirectResult } from "firebase/auth";
// import { useEffect } from "react";
import SignUpForm from "../../component/sign-up-form/sign-up-form.component";
import SignInForm from "../../component/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss"

const Authentication = () => {
  //   useEffect(() => {
  //     getRedirectResult(auth).then((res) => {
  //       console.log(auth);
  //       console.log(res);
  //     });
  //   }, []);

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
