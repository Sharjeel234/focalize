import axios from "axios";

const API = axios.create({ baseURL: "" });

API.interceptors.request.use((req) => {
    if(localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req;
});

// For Authenticator

export const signIn = (userData) => API.post("/users/login", userData);
export const signUp = (userData) => API.post("/users/signup", userData);

// For CRUD Features 

export const fetchTasks = () => API.get('/tasks');
export const createTask = (newTask) => API.post('/tasks', newTask);
export const updateTask = (id, updatedTask) => API.patch(`tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`tasks/${id}`);
export const updateTaskChecked = (id) => API.get(`tasks/${id}`)

// For Novu Implementation

export const sendSms = (task) => API.post("/tasks/send-sms", task);
export const sendEmail = (task) => API.post("/tasks/send-email", task);
export const deleteInApp = (task) => API.post("/tasks/delete", task);