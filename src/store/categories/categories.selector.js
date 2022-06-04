import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    console.log("fired selector 1");
    return state.categories};

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categories) => {
    console.log("fired selector 2");  
    return categories.categories}
);

export const categoriesSelecter = createSelector(
  [selectCategories],
  (categories) => {
      console.log("fired selector 3");
    return categories.reduce((preVale, docSnap) => {
      const { title, items } = docSnap.data();
      preVale[title.toLowerCase()] = items;
      return preVale;
    }, {});
  }
);
