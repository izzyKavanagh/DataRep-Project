import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

const TodoItem = (props) => {
  useEffect(() => {
    console.log("Task:", props.todo);
  }, [props.todo]);

  const handleCheckboxChange = () => {
    setCompleted(!completed); // Toggle the completion status
    console.log(`Task "${props.todo.task}" is now ${!completed ? 'Completed' : 'Incomplete'}`);
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
                checked={completed}
                onChange={handleCheckboxChange}
                style={{ marginRight: '10px' }}
              />
              <p style={{ margin: 0, textDecoration: completed ? 'line-through' : 'none' }}>
                <strong>Task:</strong> {props.todo.task}
              </p>
            </div>
            <p>
              <strong>Status:</strong> {completed ? 'Completed' : 'Incomplete'}
            </p>
          </Card.Body>
        </Card>
      </div>
    );
};

export default TodoItem;