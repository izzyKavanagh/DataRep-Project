import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const CreateNote = () => {

    const [title, setTitle] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [dateEdited, setDateEdited] = useState("");
    const [noteBody, setNoteBody] = useState("");

    const navigate = useNavigate();
  
    useEffect(() => {
        const currentDate = new Date(); 
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

      navigate("/notes");
    };
  
    return (
        <Container>
            <h1 className='text' style={{margin: '20px', width: '500px', height: 'auto', backgroundColor: 'white',
                color: 'black',padding: '10px',borderRadius: '50px',border: '2px solid black', textAlign: 'center',
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)", }}>
                Create New Note
            </h1>
            <Row className="mb-4">
                <Col>
                    <Form.Control
                        type="text" 
                        placeholder="Title" 
                        style={{ width: "100%", marginBottom: "10px", padding: "10px" }} 
                        value={title} // Controlled input, value is tied to state
                        onChange={handleTitleChange} 
                    />
                </Col>
            </Row>

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
    
            <Row>
                <Col>
                    {/* Save Button */}
                    <button onClick={handleSaveNote} className="add-button" style={{ borderRadius: '20px', border: '1.5px solid black', padding: '10px 20px' }}>Save Note</button>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateNote;