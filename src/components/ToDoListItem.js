import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { Fab, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const TodoItem = (props) => {
    // Local state to manage the task list
    const [todos, setTodos] = useState(props.todos);
    const [newTask, setNewTask] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editing, setEditing] = useState(false);

    // Sync todos state when props.todos changes
    useEffect(() => {
        //sort tasks when page is loaded/reloaded
        const sortedTodos = [...props.todos].sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
        setTodos(sortedTodos);
        console.log("Tasks updated:", props.todos);
    }, [props.todos]);


    const toggleEditMode = () => {
        setEditing(!editing); // Toggle edit mode
    };

    //function for deleting tasks from list
    const handleDeleteTask = (id) => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
    
        axios.delete(`http://localhost:4000/api/todos/${id}`).catch((err) => console.error('Error deleting task:', err));
    };

    const handleCheckboxChange = (id, currentStatus) => {
        // Update the local state
        const updatedTodos = todos.map((todo) =>
            todo._id === id ? { ...todo, completed: !currentStatus } : todo
        );
        //sort the tasks based on completed status
        updatedTodos.sort((a, b) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
        setTodos(updatedTodos);

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

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleAddTask = () => {
        //check if the task string has whitespace characters at beginning/end 
        if (newTask.trim() === '') {
            return;
        }
        const task = {
            task: newTask,
            completed: false, // Set completed to false by default
        };

        // Add the new task to the todo list
        axios.post('http://localhost:4000/api/todos', task)
        .then((res) => {
            setTodos((prevTodos) => [res.data.todo, ...prevTodos]); // Add new task to the beginning
            setNewTask(''); // Clear the input
            handleCloseDialog(); // Close the dialog
        })
        .catch((err) => {
            console.error("Error adding task:", err);
        });
    }

    return (
            
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh', padding: '20px' }}>
            {/* Left container */}
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
                flexDirection: 'column', // Stack the content vertically
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
                                {/* Edit Button (displayed in Edit Mode) */}
                                {editing && (
                                    <button onClick={() => {}} style={{ marginRight: '10px', height: '25px', width: '30px', backgroundColor: 'white', boxShadow: '2px 2px 2px rgb(0, 0, 0, 0.7)',
                                        border: '1px solid black', alignItems: 'center', borderRadius: '10px', display: 'flex', justifyContent: 'center', fontSize: "11px" }} >
                                        Edit
                                    </button>
                                )}
                                 {/* Edit Button (displayed in Edit Mode) */}
                                {editing && (
                                <button onClick={() => handleDeleteTask(todo._id)} style={{ marginRight: '10px', height: '25px', width: '25px', backgroundColor: 'rgba(125, 2, 2, 0.69)', 
                                border: '1px solid black', alignItems: 'center', borderRadius: '10px', display: 'flex', justifyContent: 'center', boxShadow: '2px 2px 2px rgb(0, 0, 0, 0.7)'}}>
                                    -
                                </button>
                                )}
                                {/* Checkbox for each task */}
                                <input type="checkbox" checked={todo.completed}
                                    onChange={() => handleCheckboxChange(todo._id, todo.completed)}
                                    style={{ marginRight: '10px'}}
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
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab size="small" aria-label="add" sx={{ boxShadow: '3px 3px 3px rgb(0, 0, 0, 1)', backgroundColor: 'rgb(50, 168, 82)' }} onClick={handleOpenDialog}>
                            <AddIcon/>
                        </Fab>
                    </Box>
                </Card.Footer>
            </Card>

             {/* Dialog for adding new task */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Add New Task</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Task"
                        type="text"
                        fullWidth
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTask} color="primary">
                        Add Task
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TodoItem;