import TodoItem from "./ToDoListItem";

// function that renders all todo items
const ToDos = (props) => {
    return (
        // Pass the entire todos array as a prop to TodoItem
        <TodoItem todos={props.todos} />
    );
};

export default ToDos; 