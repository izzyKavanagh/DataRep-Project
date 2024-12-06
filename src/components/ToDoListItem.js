import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const TodoItem = (props) => {

    const [completed, setCompleted] = useState(props.todo.completed);

    useEffect(() => {
        console.log("Task:", props.todo);
    }, [props.todo]);

    const handleCheckboxChange = () => {
        const newCompletedStatus = !completed;
        setCompleted(newCompletedStatus); // Update local state
    
        // Send the updated status to the database
        axios.put(`http://localhost:4000/api/todos/${props.todo._id}`, { completed: newCompletedStatus })
        .then((res) => {
            console.log(`Task "${props.todo.task}" updated to ${newCompletedStatus ? 'Completed' : 'Incomplete'}`);
        })
        .catch((err) => {
            console.error("Error updating task:", err);
        });
    };

    return (
        <div>
        {/* Card to display the to-do item */}
        <Card>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Checkbox to mark task as complete/incomplete */}
              <input
                type="checkbox"
                checked={props.todo.completed}
                onChange={handleCheckboxChange}
                style={{ marginRight: '10px' }}
              />
              <p style={{ margin: 0, textDecoration: props.todo.completed ? 'line-through' : 'none' }}>
                <strong>Task:</strong> {props.todo.task}
              </p>
            </div>
            <p>
              <strong>Status:</strong> {props.todo.completed ? 'Completed' : 'Incomplete'}
            </p>
          </Card.Body>
        </Card>
      </div>
    );
};

export default TodoItem;