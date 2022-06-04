import { actionType } from "./user.type";
  
  const initialState = {
    currUser: null,
  };

  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.setCurrUser:
        return { ...state, currUser: action.payload };
  
      default:
        return state;
    }
  };
  
 