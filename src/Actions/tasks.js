import * as api from "../Common/api";
import { toast } from 'react-toastify';

export const getTasks = () => async (dispatch) => {
    try {
        const { data } = await api.fetchTasks();
        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (error) {
        console.log("getTasks error", error);
    }
}

export const createTask = (task) => async (dispatch) => {
    try {
        const { data } = await api.createTask(task);
        dispatch({ type: "CREATE", payload: data });
        toast.success("Task Created!");
    } catch (error) {
        console.log("createTask error", error)
    }
}
export const updateTask = (id, task) => async (dispatch) => {
    try {
        const { data } = await api.updateTask(id, task);
        dispatch({ type: "UPDATE", payload: data });
        toast.success("Task Updated!");
    } catch (error) {
        console.log("updateTask error", error)
    }
}

export const deleteTask = (id) => async (dispatch) => {
    try {
        await api.deleteTask(id);
        dispatch({ type: "DELETE", payload: id });
        toast.warning("Task Deleted!");
    } catch (error) {
        console.log("deleteTask error", error)
    }
}

export const sendSmsNotification = (task) => async (dispatch) => {
    try {
        const response = await api.sendSms(task);
        console.log("sms Notification", response);
        toast.success("SMS Sent!");
    } catch (error) {
        console.log("sendSms error", error);
        toast.error(error.response.data.message);
    }
}

export const sendEmailNotification = (task) => async (dispatch) => {
    try {
        const response = await api.sendEmail(task);
        console.log("sms Notification", response);
        toast.success("Email Sent!");
    } catch (error) {
        console.log("sendEmail error", error);
        toast.error(error.response.data.message);
    }
}

export const deleteTaskInApp = (task) => async (dispatch) => {
    try {
        const response = await api.deleteInApp(task);
        console.log("deleteInApp", response);
    } catch (error) {
        console.log("deleteInApp error", error);
        toast.error(error.response.data.message);
    }
}

export const toggleTask = (id) => async (dispatch) => {
    try {
        const res = await api.updateTaskChecked(id);
        dispatch({ type: "TOGGLE_DONE", payload: res.data });
    } catch (error) {
        console.log("Error while calling getAllTask API", error.message);
    }
}