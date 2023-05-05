import * as api from '../Common/api';
import toast from 'react-hot-toast';

export const signin = (formValue, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formValue);
        dispatch({ type: "AUTH", payload: data });
        navigate('/home');
        toast.success("Login Successfully");
    } catch (error) {
        console.log("signin error", error)
        toast.error(error.response.data.message);
    }
}

export const signup = (formValue, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formValue);
        dispatch({ type: "AUTH", payload: data });
        navigate("/home");
        toast.success("Account Created Successfully");
    } catch (error) {
        console.log("signup error", error);
        toast.error(error.response.data.message);
    }
}