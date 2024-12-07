import TodoItem from "./ToDoListItem";

const ToDos = (props) => {
    return (
        // Pass the entire todos array as a prop to a single TodoItem component
        <TodoItem todos={props.todos} />
    );
};

export default ToDos; 