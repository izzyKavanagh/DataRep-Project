//import bootstrap components for card formating 
import React from 'react';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NoteItem = (props) => {

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedNote, setSelectedNote] = useState(null);

  const formatDate = (date) => {
    if (!date) return 'N/A'; // Handle missing dates
      return new Date(date).toLocaleDateString('en-GB');
  };

  useEffect(() => {
      console.log("Module Item:", props.mynote);
    }, [props.mynote]); // Only run this effect when the mymovie prop changes

    // Handle opening the modal
  const handleCardClick = () => {
    setSelectedNote(props.mynote); // Store the note that was clicked
    setShowModal(true); // Show the modal
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
      <div>
          {/* Bootstrap Card component to display movie information */}
          <Card onClick={handleCardClick} style={{ cursor: 'pointer' }}>
              {/* Card Header displays movie title */}
              <Card.Header><h3>{props.mynote.title}</h3></Card.Header>
              {/* Card Body contains movie information */} 
              <Card.Body style={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {/* Blockquote used to add movie poster and year */}
                  <blockquote className="blockquote mb-0">
                    <p dangerouslySetInnerHTML={{ __html: props.mynote.noteBody }} style={{ fontSize: '13px', lineHeight: '1' }}/>
                  </blockquote>
              </Card.Body>
              <Card.Footer className="text-muted">
                <div style={{ fontSize: '10PX', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>Created:</strong> {formatDate(props.mynote.dateCreated)}</span>
                    <span><strong>Edited:</strong> {formatDate(props.mynote.dateEdited)}</span>
                </div>
            </Card.Footer>
          </Card>
          {/* Modal to display the full note */}
          {selectedNote && (
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>{selectedNote.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <h5>Note Body:</h5>
                <div dangerouslySetInnerHTML={{ __html: selectedNote.noteBody }} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                <Link to={"/editNote/" + selectedNote._id}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </Modal.Footer>
            </Modal>
          )}
      </div>
    );

  };
  
  export default NoteItem; //exports MovieItem function so it can be imported and used in other files