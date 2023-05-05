const taskReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [ ...state, action.payload ];
        case "UPDATE":
            return state.map((task) => 
                task._id === action.payload._id ? action.payload : task
            );
        case "TOGGLE_DONE":
            return state.map((task) => 
                task._id === action.payload._id ? { ...task, done: !task.done } : task
            );
        case "DELETE":
            return state.filter((task) => task._id !== action.payload);
        default:
            return state;
    }
}

export default taskReducer;