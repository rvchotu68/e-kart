import { categoriesActionType } from "./categories.type";


const INITIAL_STATE = {
    categories : []
};


export const CategoriesReducer = (state = INITIAL_STATE,action = {})=>{

    const {type,payload } = action;

    switch(type){
        case categoriesActionType.setCategoriesMap : return {...state,categories : payload};
        
        default : return state;
    }

}