import { categoriesActionType } from "./categories.type";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setCategoriesMap = (categoriesMap) => createAction(categoriesActionType.setCategoriesMap,categoriesMap); 