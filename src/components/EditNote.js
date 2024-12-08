import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For retrieving the note id from the URL and navigating
import { Form, Container, Row, Col, Button } from 'react-bootstrap';

const EditNote = () => {

  return (
    <Container>
      <h1>Edit Note</h1>
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Title"
            //value={noteTitle}
            //onChange={handleTitleChange}
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          {/* Editable area for the note body */}
          <div
            contentEditable
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              minHeight: '200px',
              backgroundColor: '#f9f9f9',
            }}
            //onInput={handleBodyChange}
            //dangerouslySetInnerHTML={{ __html: noteBody }}
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button>
            Save Note
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditNote;