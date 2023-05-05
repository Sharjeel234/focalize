import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/header';
import Task from '../../Components/Task/task';
import './home.css';
import { getTasks, createTask, updateTask } from '../../Actions/tasks';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TiPlus } from 'react-icons/ti';
import toast from 'react-hot-toast';

const Home = () => {
    const [inputText, setInputText] = useState({
        title: "",
        description: "",
        date: null
    });

    const [currentId, setCurrentId] = useState(null);
    const [addMore, setAddMore] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") === "dark" || !localStorage.getItem("theme")
    );

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [tasksByDate, setTasksByDate] = useState({});

    const dispatch = useDispatch();

    const tasks = useSelector((state) => state.tasks);
    const user = JSON.parse(localStorage.getItem("profile"));
    const updatedTask = useSelector((state) => 
        currentId ? state.tasks.find((c) => c._id === currentId) : null
    );

    useEffect(() => {
        if(theme) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    
    }, [theme]);
    
    const themeHandler = () => {
        const newTheme = !theme;

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");

        document.body.classList.toggle("dark-mode");
    }

    const currentHour = new Date().getHours();

    let greeting;
    if(currentHour >= 5 && currentHour < 10)
    {
        greeting = "Good Morning";
    }
    else if(currentHour >= 10 && currentHour < 15)
    {
        greeting = "Good Afternoon";
    }
    else if(currentHour >= 15 && currentHour < 19)
    {
        greeting = "Good Evening";
    }
    else 
    {
        greeting = "Good Night";
    }

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch, currentId]);

    useEffect(() => {
        if(updatedTask){
            setInputText(updatedTask);
        }
    }, [updatedTask]);
    
    const changeHandler = (e) => {
        setInputText({
            ...inputText,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        const sortedTasks = [...tasks].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        const tasksByDate = sortedTasks.reduce((acc, task) => {
            const taskDate = new Date(task.date);
            const dateStr = taskDate.toDateString();
            
            if(!acc[dateStr])
            {
                acc[dateStr] = [task];
            }
            else
            {
                acc[dateStr].push(task);
            }
            return acc;
        }, {});
        setTasksByDate(tasksByDate);
    }, [tasks]);
    
    const handleSubmitTask = (e) => {
        e.preventDefault();

        if(!inputText.title && !inputText.date) {
            return toast.error("Title and Date are required", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff"
                },
            });
        }
        inputText.date = selectedDate.toISOString();

        if(currentId) {
            dispatch(updateTask(currentId, inputText));
            toast("Task Updated", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff"
                },
            });
            setIsEditing(false);
        }
        else {
            dispatch(createTask({ ...inputText, message: "created" }));
            toast("Task Created", {
                icon: "👏",
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff"
                },
            });
        }
        handleClearTask();
    }

    const handleClearTask = () => {
        setCurrentId(null);
        setInputText({ title: "", description: "" });
        setSelectedDate(null);
    }

    const addMoreHandler = (e) => {
        e.preventDefault();

        setAddMore((prev) => !prev);
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const addDetailsHandler = () => {
        setShowForm((prev) => !prev);
    }

    return (
        <main className='home'>
            <Header theme={theme} themeHandler={themeHandler} />
            <div className='home_container'>
                <div className='home_top_heading'>
                    <h1>
                        {greeting}
                        <img 
                            style={{ height: "3rem", width: "auto" }}
                            src='https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif'
                            alt='waving-hand'
                        />
                    </h1>
                    <h3>{user?.result?.name}</h3>
                </div>

                <div
                    className='home_container_top'
                    style={{ backgroundColor:theme ? "#282834" : "#ececec" }}
                >
                    <div className='home_conatiner_heading' onClick={addDetailsHandler}>
                        <div className='add-icon'>
                            <TiPlus />
                        </div>
                        <h3 className='form_heading'>Create A Task</h3>
                    </div>
                    {showForm && (
                        <form className='home_form_container' onSubmit={handleSubmitTask}>
                            <div className='home_form_top'>
                                <div className='home_input_container'>
                                    <input 
                                        type='text'
                                        value={inputText.title}
                                        name='title'
                                        onChange={changeHandler}
                                        className='form_input'
                                        placeholder='Task Title'
                                    />
                                    <DatePicker 
                                        selected={selectedDate}
                                        name='date'
                                        onChange={handleDateChange}
                                        placeholderText='Select Date'
                                        className='form_date_picker'
                                        dateFormat="dd/MM/yyyy"
                                    />
                                    <button className='form_add_more' onClick={addMoreHandler}>
                                        Add More
                                    </button>
                                    <button className='form_add_more'>
                                        {isEditing ? "Update" : "Create"}
                                    </button>
                                </div>
                            </div>
                            {addMore && (
                                <textarea 
                                    type='text'
                                    value={inputText.description}
                                    name='description'
                                    onChange={changeHandler}
                                    className='form_textarea'
                                    placeholder='Enter Description'
                                />
                            )}
                        </form>
                    )}
                </div>
                <div className='home_container_bottom'>
                    {Object.entries(tasksByDate).length > 0 ? (
                        Object.entries(tasksByDate).map(([dateStr, tasks]) => {
                            const userTasks  = tasks.filter(
                                (task) => task.creator === user?.result?._id
                            );
                            return userTasks.length > 0 ? (
                                <div key={dateStr}>
                                    <div className='task_row'>
                                        <h2
                                            style={{ backgroundColor: theme ? "#282834" : "#e6e6e6" }}
                                            className='task_row_title'
                                        >
                                            {new Date(dateStr).toLocaleDateString()}
                                        </h2>
                                        {userTasks.map((task) => (
                                            <Task 
                                                key={task._id}
                                                item={task}
                                                setCurrentId={setCurrentId}
                                                setShowForm={setShowForm}
                                                setIsEditing={setIsEditing}
                                                setSelectedDate={setSelectedDate}
                                                theme={theme}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : null;
                        })
                    ) : (
                        <h2>No Tasks found for selected date</h2>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Home;