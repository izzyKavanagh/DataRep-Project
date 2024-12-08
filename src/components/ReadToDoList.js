import { useEffect, useState } from 'react';
import axios from 'axios';
import ToDos from './ToDoList';

const ReadToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = () => {
            axios.get('http://localhost:4000/api/todos')
            .then((res) => setTodos(res.data.todos))
            .catch((err) => console.error(err));
        };

        fetchTodos();
    }, []);

    return (
        <div>
            <h2>To-Do List</h2>
            {/* Display the to-do list */}
            <ToDos todos={todos} />
            {/* Form to add a new to-do */}
        </div>
    );
};

export default ReadToDoList;