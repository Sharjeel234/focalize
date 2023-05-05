import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import './task.css';

import {
    deleteTask,
    deleteTaskInApp,
    sendEmailNotification,
    sendSmsNotification,
    toggleTask,
} from '../../Actions/tasks';
import { MdOutlineEmail, MdSms } from 'react-icons/md';
import { BsTrash3Fill, BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Task = ({
    item,
    setCurrentId,
    setShowForm,
    setIsEditing,
    setSelectedDate,
    theme,
}) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [isSms, setIsSms] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const dispatch = useDispatch();

    useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);
    
    const doneHandler = async (event) => {
        dispatch(toggleTask(item._id));
    }
    const deleteTaskHandler = async () => {
        const deleteInAppTask = {
            title: item.title,
            description: item.description,
            userId: user?.result?._id,
            message: "deleted"
        }

        try {
            dispatch(deleteTaskInApp(deleteInAppTask));
            dispatch(deleteTask(item._id));
            toast.error("Todo deleted!", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                }
            });
        } catch (error) {
            console.log("deleteTaskHandler error", error);
        }
    }

    const smsHandler = () => {
        setIsSms((perv) => !perv);
    }

    const emailHandler = () => {
        setIsEmail((perv) => !perv);
    }

    const descriptionHandler = () => {
        setShowDescription((perv) => !perv);
    }

    const editTaskHandler = () => {
        setCurrentId(item._id);
        setSelectedDate(new Date(item.date));
        setShowForm(true);
        setIsEditing(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleSubmitEmail = async (e) => {
        e.preventDefault();

        if(!email) {
            return toast.error("Email is required to send notification", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                }
            });
        }

        const emailTask = {
            title: item.title,
            description: item.description,
            email: email,
            taskId: item._id
        }

        try {
            dispatch(sendEmailNotification(emailTask));
        } catch (error) {
            console.log("handleSubmitEmail error", error);
        }

        setEmail('');
    }

    const handleSubmitPhone = async (e) => {
        e.preventDefault();

        if(!phone) {
            return toast.error("Phone number is required", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                }
            });
        }
        else if(phone.length < 11) {
            return toast.error("Enter correct phone number", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                }
            });
        }

        const smsTask = {
            title: item.title,
            description: item.description,
            phone: phone,
            taskId: item._id
        }

        try {
            dispatch(sendSmsNotification(smsTask));
        } catch (error) {
            console.log("handleSubmitPhone error", error);
        }

        setPhone("");
    }

    return (
        <div
            className="task"
            style={{
                backgroundColor: theme ? "#1f1f2b" : "f2f2f2"
            }}
        >
            <div className="task_container">
                <div className="task_text_container">
                    <input 
                    type="checkbox"
                    className="task_checkbox"
                    checked={item.done}
                    onChange={doneHandler}
                    style={{
                        cursor: "pointer"
                    }}
                    />
                    <h2 className={ item.done ? "task_title done" : "task_title" }>
                        {item.title}
                    </h2>
                </div>
                <div className="task_btn_container">
                    {item.description.length > 0 && (
                        <div
                            className="icon_container task_description"
                            onClick={descriptionHandler}
                        >
                            <BsReverseLayoutTextWindowReverse />
                        </div>
                    )}
                    <div className="icon_container task_email" onClick={emailHandler}>
                        <MdOutlineEmail />
                    </div>
                    <div className="icon_container task_sms" onClick={smsHandler}>
                        <MdSms />
                    </div>
                    <div className="icon_container task_update" onClick={editTaskHandler}>
                        <FiEdit />
                    </div>
                    <div className="icon_container task_delete" onClick={deleteTaskHandler}>
                        <BsTrash3Fill />
                    </div>
                </div>
            </div>
            <div className="task_input_container">
                {showDescription && (
                    <p
                        className={item.done ? "task_description done" : "task_description"}
                    >
                        {item.description}
                    </p>
                )}
                {isEmail && (
                    <form
                        className="task_form_container"
                        onSubmit={handleSubmitEmail}
                    >
                        <input 
                            className="input_box"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your Email"
                        />
                        <button className="task_form_btn">Send Email</button>
                    </form>
                )}
                {isSms && (
                    <form
                        className="task_form_container"
                        onSubmit={handleSubmitPhone}
                    >
                        <input 
                            className="input_box"
                            type="number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Your Phone Number"
                        />
                        <button className="task_form_btn">Send SMS</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Task;