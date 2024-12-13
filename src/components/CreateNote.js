import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col } from 'react-bootstrap';

const CreateNote = () => {

    // useState hooks to manage the title, body, and date properties for the note
    const [title, setTitle] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [dateEdited, setDateEdited] = useState("");
    const [noteBody, setNoteBody] = useState("");
    const navigate = useNavigate();
  
    // useEffect hook to set the current date as both creation and edit date
    useEffect(() => {
        const currentDate = new Date(); 
        setDateCreated(currentDate);
        setDateEdited(currentDate); 
    }, []);

    // Handler for title input field
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
  
    // Handle body change from contentEditable div
    const handleBodyChange = (event) => {
      setNoteBody(event.target.innerHTML); 
    };
  
    // Function to save the note to the backend and navigate to the notes page
    const handleSaveNote = () => {
        console.log("Saving Note...");
        console.log("Title:", title);
        console.log("Body:", noteBody);
        console.log("Date Created:", dateCreated);
        console.log("Date Edited:", dateEdited);
      
        // Prepare the note data to be sent to the backend
        const notes = { title, dateCreated, dateEdited, noteBody };

        // POST request to save the note in the database
        axios.post('http://localhost:4000/api/notes', notes)
        .then((res) => console.log(res.data)) 
        .catch((err) => console.log(err.data)); 

        // Navigate to the notes page after saving
        navigate("/notes");
    };
  
    return (
        //container that displays form to get user input when creating new note
        <Container>
            {/* Heading for the "Create New Note" section */}
            <h1 className='text' style={{margin: '20px', width: '500px', height: 'auto', backgroundColor: 'white',
                color: 'black',padding: '10px',borderRadius: '50px',border: '2px solid black', textAlign: 'center',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)", }}>
                Create New Note
            </h1>

             {/* Title input field */}
            <Row className="mb-4">
                <Col>
                    <Form.Control
                        type="text" 
                        placeholder="Title" 
                        style={{ width: "100%", marginBottom: "10px", padding: "10px" }} 
                        value={title}
                        onChange={handleTitleChange} 
                    />
                </Col>
            </Row>

            {/* Note body input field using contentEditable */}
            <Row className="mb-4">
                <Col>
                    {/* Body input field */}
                    <div
                    contentEditable
                    style={{
                        border: "2px solid #ccc",
                        padding: "10px",
                        minHeight: "200px",
                        backgroundColor: "#f9f9f9",
                        marginBottom: "20px",
                    }}
                    onInput={handleBodyChange}/>
                </Col>
            </Row>
    
            {/* Save button */}
            <Row>
                <Col>
                    <button onClick={handleSaveNote} className="add-button" style={{ borderRadius: '20px', border: '1.5px solid black', padding: '10px 20px' }}>Save Note</button>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateNote;