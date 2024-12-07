import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TodoItem = (props) => {
    // Local state to manage the task list
    const [todos, setTodos] = useState(props.todos);

    // Sync todos state when props.todos changes
    useEffect(() => {
        setTodos(props.todos);
        console.log("Tasks updated:", props.todos);
    }, [props.todos]);

    const handleCheckboxChange = (id, currentStatus) => {
        // Update the local state
        const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !currentStatus } : todo
        );
        setTodos(updatedTodos);
s
        // Send the updated status to the database
        axios
            .put(`http://localhost:4000/api/todos/${id}`, { completed: !currentStatus })
            .then((res) => {
                console.log(`Task "${id}" updated to ${!currentStatus ? 'Completed' : 'Incomplete'}`);
            })
            .catch((err) => {
                console.error("Error updating task:", err);
            });
    };

    return (
        <div>
            {/* Single card containing all tasks */}
            <Card>
                <Card.Header>Task List</Card.Header>
                <Card.Body>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {todos.map((todo) => (
                            <li
                                key={todo._id}
                                style={{
                                    marginBottom: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                {/* Checkbox for each task */}
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo._id, todo.completed)}
                                    style={{ marginRight: '10px' }}
                                />
                                {/* Task text with dynamic strikethrough */}
                                <span
                                    style={{
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                    }}
                                >
                                    {todo.task}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TodoItem;