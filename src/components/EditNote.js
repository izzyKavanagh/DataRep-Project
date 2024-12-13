import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For retrieving the note id from the URL and navigating
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const EditNote = () => {

    // Getting the note id from the URL
    const { id } = useParams(); 

    // State variables to manage the note's title, creation date, and body content
    const [title, setNoteTitle] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const navigate = useNavigate(); // Hook for navigation after updating the note

    // Fetch the note data when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:4000/api/notes/${id}`) 
        .then(response => {
            const { title, dateCreated, noteBody } = response.data; 
            // Set the note data to the state variables
            setNoteTitle(title);
            setDateCreated(dateCreated);
            setNoteBody(noteBody);
                
        })
        .catch(error => {
            console.error('There was an error fetching the note!', error);
        });
    }, [id]); // Dependency array ensures this runs only when the id changes

    // Function to handle saving the edited note
    const handleSaveNote = () => {
        const updatedNote = {
            title: title,
            noteBody: noteBody,
            dateCreated: dateCreated, // Keep the original creation date
            dateEdited: new Date() // Set the current date as the "edited" date
        };
        
        // Send the updated note to the backend via a PUT request
        axios.put(`http://localhost:4000/api/notes/${id}`, updatedNote)
        .then(() => {
            console.log('Note updated successfully');
            navigate('/notes'); // Redirect to the notes page
        })
        .catch((error) => console.log(error));
    };

    // Function to handle changes in the note body
    const handleBodyChange = (event) => {
        setNoteBody(event.target.innerHTML);  // Update state with the inner HTML
    };

    return (
    <Container>
        {/* Heading for the edit note page */}
        <h1 lassName='text' style={{margin: '20px', width: '500px', height: 'auto', backgroundColor: 'white',
            color: 'black',padding: '10px',borderRadius: '50px',border: '2px solid black', textAlign: 'center',
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)", }}>
            Edit Note
        </h1>

        {/* Title input field */}
        <Row className="mb-4">
        <Col>
            <Form.Control
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setNoteTitle(e.target.value)} 
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
            />
        </Col>
        </Row>

        {/* Editable area for the note body */}
        <Row className="mb-4">
        <Col>
            <div contentEditable
                style={{border: '1px solid #ccc', padding: '10px', minHeight: '200px', backgroundColor: '#f9f9f9',}}
                onInput={handleBodyChange} dangerouslySetInnerHTML={{ __html: noteBody }}/>
        </Col>
        </Row>

        {/* Save button to trigger the update action */}
        <Row>
        <Col>
            <Button className='add-button' onClick={handleSaveNote} style={{ borderRadius: '20px', padding: '10px 20px' , marginTop: '20px', marginBottom: '40px'}}> Save Note</Button>
        </Col>
        </Row>
    </Container>
    );
};

export default EditNote;