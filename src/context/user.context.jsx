import { createContext,useEffect, useReducer } from "react";
import {
  onAuthStateChangedHandler,
  createUserDocumentWithAuth,
} from "../utils/firebase/firebase.utils";

export const Context = createContext({
  currUser: null,
  setCurrUser: () => {},
});

export const actionType = {
  setCurrUser: "setCurrUser",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionType.setCurrUser:
      return { ...state, currUser: action.payload };

    default:
      throw new Error("Error");
  }
};

const initialObj = {
  currUser: null,
};

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialObj);

  const setCurrUser = (actionObj) => {
    dispatch(actionObj);
  };
  const value = { state, setCurrUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler(async (user) => {
      if (user) await createUserDocumentWithAuth(user);

      setCurrUser({
        type: actionType.setCurrUser,
        payload: user,
      });
    });

    return unsubscribe;
  }, []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default UserContext;
