import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

const TodoItem = (props) => {
  useEffect(() => {
    console.log("Task:", props.todo);
  }, [props.todo]);

    return (
        <div>
            {/* Card to display the to-do item */}
            <Card>
                <Card.Body>
                    <p>
                        <strong>Task:</strong> {props.todo.task}
                    </p>
                    <p>
                        <strong>Status:</strong> {props.todo.completed ? 'Completed' : 'Incomplete'}
                    </p>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TodoItem;