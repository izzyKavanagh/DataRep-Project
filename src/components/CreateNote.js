import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const CreateNote = () => {

    const [title, setTitle] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [dateEdited, setDateEdited] = useState("");
    const [noteBody, setNoteBody] = useState("");
  
    useEffect(() => {
        const currentDate = new Date().toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
        setDateCreated(currentDate);
        setDateEdited(currentDate); // Initially set dateEdited to be same as dateCreated
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
  
    // Handle body change from contentEditable div
    const handleBodyChange = (event) => {
      setNoteBody(event.target.innerHTML);  // Update state with the inner HTML
    };
  
    const handleSaveNote = () => {
        console.log("Saving Note...");
        console.log("Title:", title);
        console.log("Body:", noteBody);
        console.log("Date Created:", dateCreated);
        console.log("Date Edited:", dateEdited);
      
      const notes = { title, dateCreated, dateEdited, noteBody };
      axios.post('http://localhost:4000/api/notes', notes)
      .then((res) => console.log(res.data)) // Log success response
      .catch((err) => console.log(err.data)); // Log error response if request fails
    };
  
    return (
      <div>
        <h1>Create New Note</h1>
  
        {/* Title input field */}
        <input 
          type="text" 
          placeholder="Title" 
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }} 
          value={title} // Controlled input, value is tied to state
          onChange={handleTitleChange} 
        />
  
        {/* Body input field */}
        <div
          contentEditable
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            minHeight: "200px",
            backgroundColor: "#f9f9f9",
            marginBottom: "20px",
          }}
          onInput={handleBodyChange}/>
  
        {/* Save Button */}
        <button onClick={handleSaveNote}>Save Note</button>
      </div>
    );
}

export default CreateNote;