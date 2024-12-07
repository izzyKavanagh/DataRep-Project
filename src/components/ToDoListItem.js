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

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',}}>
            {/* Single card containing all tasks */}
            <Card  style={{ width: 'auto', maxWidth: '500px', minWidth: '300px' }}>
                <Card.Header style={{backgroundColor: 'rgba(230, 204, 225, 0.8)'}}>Task List</Card.Header>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                        {todos.map((todo) => (
                            <li key={todo._id} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center',
                             borderRadius: '20px'}}>
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
                <Card.Footer style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', 
                    height: '50px', backgroundColor: 'rgba(230, 204, 225, 0.8)'}}>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Fab size="small" color="secondary" aria-label="add" sx={{ boxShadow: 'none' }} onClick={handleOpenDialog}>
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