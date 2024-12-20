import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Modal, Button, Form } from 'react-bootstrap';

import { Fab, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TodoItem = (props) => {
    // Local state hooks to manage tasks, input, modal, and edit mode
    const [todos, setTodos] = useState(props.todos);
    const [newTask, setNewTask] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(false);

    // Sync todos state when todos change
    useEffect(() => {
        //sort tasks based on completion status when page is loaded/reloaded
        const sortedTodos = [...props.todos].sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1); 
        setTodos(sortedTodos);
        console.log("Tasks updated:", props.todos);
    }, [props.todos]); // effect runs when todos change


    // handles editing mode view (for removing tasks)
    const toggleEditMode = () => {
        setEditing(!editing);
    };

    //function for deleting tasks from list
    const handleDeleteTask = (id) => {
        //deletes locally
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
    
        //deletes in database
        axios.delete(`http://localhost:4000/api/todos/${id}`).catch((err) => console.error('Error deleting task:', err));
    };

    // Handle changes to the task's completion status (checkbox click)
    const handleCheckboxChange = (id, currentStatus) => {
        // Update the local state
        const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !currentStatus } : todo
        );
        //sort tasks based on completed status
        updatedTodos.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
        setTodos(updatedTodos);

        // Send the updated status to the database
        axios.put(`http://localhost:4000/api/todos/${id}`, { completed: !currentStatus })
            .then((res) => {
                console.log(`Task "${id}" updated to ${!currentStatus ? 'Completed' : 'Incomplete'}`);
            })
            .catch((err) => {
                console.error("Error updating task:", err);
            });
    };

    // Handle adding a new task
    const handleAddTask = () => {
        //dont add if task string has whitespace characters at beginning/end 
        if (newTask.trim() === '') {
            return;
        }
        const task = {
            task: newTask,
            completed: false,
        };

        // Add the new task to database
        axios.post('http://localhost:4000/api/todos', task)
        .then((res) => {
            // Add new task to the beginning
            setTodos((prevTodos) => [res.data.todo, ...prevTodos]); 
            // Clear the input & close modal
            setNewTask(''); 
            setShowModal(false); 
        })
        .catch((err) => {
            console.error("Error adding task:", err);
        });
    }

    return (
            
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh', padding: '20px' }}>
            {/* Left container with generic information about todo list */}
            <div style={{
                flex: 1,
                marginRight: '150px',
                marginLeft: '50px',
                padding: '20px',
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                color: 'white',
                border: '1px solid white',
                maxWidth: '600px',
                minHeight: '500px',
                position: 'sticky',
                top: 0,
                boxShadow: '6px 6px 6px rgb(0,0,0,1)',
                display: 'flex',
                flexDirection: 'column', 
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2 style={{
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '10px 20px',
                    borderRadius: '50px',
                    textAlign: 'center',
                    display: 'inline-block'
                }}>
                    Welcome to Your To-Do List!
                </h2>
                <p style={{ marginTop: '20px' }}>
                    Organize your tasks, boost productivity, and stay on track with our to-do list app.A to-do list is more than just a simple list of tasks. 
                    It's a powerful tool that can help you organize, prioritize, and accomplish your goals. Whether you're managing your personal life, work projects, 
                    or even a team, a to-do list can keep you focused, reduce stress, and bring clarity to your day.
                </p>
                <h3>Why Use a To-Do List?</h3>
                <ul style={{ paddingLeft: '20px', listStyle: 'circle' }}>
                    <li>Prioritize your tasks easily.</li>
                    <li>Track your progress effectively.</li>
                    <li>Reduce stress and mental clutter.</li>
                    <li>Achieve your goals faster.</li>
                </ul>
            </div>

            {/* Single card containing all tasks */}
            <Card className='card-formatting' style={{ width: 'auto', maxWidth: '500px', minWidth: '300px', marginRight:'200px' }}>
                <Card.Header className='card-header text'>
                    <h1>To-Do List</h1>
                    {/* edit button to enter edit mode */}
                    <Button onClick={toggleEditMode} style={{ position: 'absolute', top: '10px', right: '10px', padding: '2px 6px', fontSize: '10px', 
                        color: 'black', border: '1px solid black', borderRadius: '40px', backgroundColor:'grey', boxShadow: '2px 2px 2px rgb(0, 0, 0, 0.7)' }}>
                        {editing ? 'Save' : 'Edit'}
                    </Button>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center card-background">
                    <ul style={{ listStyleType: 'none', padding: "20px", margin: 0 }}>
                        {todos.map((todo) => (
                            <li className='text' key={todo._id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center',
                             borderRadius: '20px'}}>
                                 {/* delete Button (displayed in Edit Mode) */}
                                {editing && (
                                <button onClick={() => handleDeleteTask(todo._id)} style={{ marginRight: '10px', height: '25px', width: '25px', backgroundColor: 'rgba(125, 2, 2, 0.69)', 
                                border: '1px solid black', alignItems: 'center', borderRadius: '10px', display: 'flex', justifyContent: 'center', boxShadow: '2px 2px 2px rgb(0, 0, 0, 0.7)'}}>
                                    -
                                </button>
                                )}
                                {/* Checkbox for each task */}
                                <input type="checkbox" checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo._id, todo.completed)}
                                    style={{ marginRight: '10px', accentColor: 'green'}}
                                />
                                {/* Task text with dynamic strikethrough */}
                                <span style={{textDecoration: todo.completed ? 'line-through' : 'none',}}>
                                    {todo.task}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Card.Body>
                <Card.Footer className='card-header' style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', 
                    height: '50px'}}>
                    {/* Fast action button for adding a new task */}
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab size="small" aria-label="add" sx={{ boxShadow: '3px 3px 3px rgb(0, 0, 0, 1)', backgroundColor: 'rgb(50, 168, 82)' }} onClick={() => setShowModal(true)}>
                            <AddIcon/>
                        </Fab>
                    </Box>
                </Card.Footer>
            </Card>

             {/* Modal for adding new task */}
             <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* form for entering new task */}
                        <Form.Group controlId="formTask">
                            <Form.Label>Task</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter task"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/* cancel and add buttons */}
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddTask}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TodoItem;