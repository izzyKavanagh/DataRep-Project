import { useEffect, useState } from 'react';
import axios from 'axios';
import ToDos from './ToDoList';

const ReadToDoList = () => {
    // State hook to store the list of to-do items
    const [todos, setTodos] = useState([]);

    // hook to fetch to-do list when component mounts
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
            {/* Pass to-do list to ToDos component & display*/}
            <ToDos todos={todos} />
        </div>
    );
};

export default ReadToDoList;