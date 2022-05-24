import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedHandler,
  createUserDocumentWithAuth,
} from "../utils/firebase/firebase.utils";

export const Context = createContext({
  currUser: null,
  setCurrUser: () => {},
});

const UserContext = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const value = { currUser, setCurrUser };

  useEffect(  () => {
    const unsubscribe = onAuthStateChangedHandler(async (user) => {
      console.log(user);
      if (user) await createUserDocumentWithAuth(user);

      setCurrUser(user);
    });

    return unsubscribe;
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default UserContext;
