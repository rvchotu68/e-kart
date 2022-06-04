import { actionType } from "./user.type";
import { createAction } from "../../utils/reducer/reducer.utils";


export const setCurrUser = (user) => createAction(actionType.setCurrUser,user);