import TodoItem from './TodoItem';

const ToDos = (props) => {
    return props.todos.map((todo) => {
        return <TodoItem todo={todo} key={todo._id} />;
    });
};

export default ToDos; 