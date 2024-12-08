import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For retrieving the note id from the URL and navigating
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const EditNote = () => {

    const { id } = useParams(); // Getting the note id from the URL
    const [title, setNoteTitle] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [dateEdited, setDateEdited] = useState('');
    const [noteBody, setNoteBody] = useState('');
    const navigate = useNavigate();

    // Fetch the note data 
    useEffect(() => {
        axios.get(`http://localhost:4000/api/notes/${id}`)
        .then(response => {
            const { title, dateCreated, noteBody } = response.data; 
            setNoteTitle(title);
            setDateCreated(dateCreated);
            setNoteBody(noteBody);
                
        })
        .catch(error => {
            console.error('There was an error fetching the note!', error);
        });
    }, [id]);

    const handleSaveNote = () => {
        const updatedNote = {
            title: title,
            noteBody: noteBody,
            dateCreated: dateCreated, // Keep the original creation date
            dateEdited: new Date()
        };
        
        axios.put(`http://localhost:4000/api/notes/${id}`, updatedNote)
        .then(() => {
            console.log('Note updated successfully');
            navigate('/notes'); // Redirect to the notes page
        })
        .catch((error) => console.log(error));
    };

    return (
    <Container>
        <h1>Edit Note</h1>
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

        <Row className="mb-4">
        <Col>
            {/* Editable area for the note body */}
            <div contentEditable
                style={{border: '1px solid #ccc', padding: '10px', minHeight: '200px', backgroundColor: '#f9f9f9',}}
                onInput={(e) => setNoteBody(e.target.innerHTML)} dangerouslySetInnerHTML={{ __html: noteBody }}/>
        </Col>
        </Row>

        <Row>
        <Col>
            <Button onClick={handleSaveNote} style={{ borderRadius: '20px', padding: '10px 20px' }}> Save Note</Button>
        </Col>
        </Row>
    </Container>
    );
};

export default EditNote;