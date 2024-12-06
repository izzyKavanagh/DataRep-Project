import React, { useState } from "react";

const ToDoList = () => {
  const [todos, setTodos] = useState([]); // State to store the list of to-dos

  return (
    <div>
        {/* List of To-Dos */}
        <ul className="list-group">
            <p>No items yet. Add something to get started!</p>
            <li className="list-group-item">
            </li>
        </ul>
    </div>
  )

}