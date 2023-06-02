
import { AUTH } from "../constants/actionTypes";

import * as api from '../api';

//  Actions Creators 
export const signin = (formData, history) => async (dispatch )=>{
    try{
    //  action is asncronous data for which actually some time needs to be passed
    // so we will use redux thunk , which allows us to specify additional asyncronus function
    // login the user

        const {data} =  await api.signIn(formData);
        
        dispatch({type:AUTH, data });
            history.push('/');
    } catch(err){
        console.log(err);
    }
    
}
export const signup = (formData, history) => async (dispatch )=>{
    
    try{
        //  sign in user
        const {data} =  await api.signUp(formData);
        dispatch({type:AUTH, data })
    history.push('/');
    } catch(err){
        console.log(err);
    }

}