import React from 'react';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NoteItem = (props) => {

  // State variables to control modal visibility
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  // Helper function to format the date as 'DD/MM/YYYY' 
  const formatDate = (date) => {
    if (!date) return 'N/A'; 
      return new Date(date).toLocaleDateString('en-GB');
  };

  //log the note details whenever 'mynote' prop changes
  useEffect(() => {
      console.log("Module Item:", props.mynote);
    }, [props.mynote]); 

  // Handle opening the modal when a card is clicked
  const handleCardClick = () => {
    setSelectedNote(props.mynote); // Store the note that was clicked
    setShowModal(true); 
  };

  // Handle closing full note modal
  const handleCloseModal = () => {
    setShowModal(false); 
  };

  // Show the confirmation modal on delete
  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  // Close the confirmation modal
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false); 
  };

  // Handle deletion of the selected note with an API call
  const handleDelete = () => {
    axios.delete(`http://localhost:4000/api/notes/${selectedNote._id}`)
    .then(() => {
      handleCloseConfirmModal(); // Close the confirmation modal after deletion
      handleCloseModal(); // Close the main modal after deletion
      props.ReloadNotes(); 
    })
    .catch((error) => {
      console.error('Error deleting note:', error);
    });
  };

  return (
      <div>
          {/* display note title and a brief excerpt */}
          <Card className='card-formatting' onClick={handleCardClick} style={{ cursor: 'pointer' }}>
              <Card.Header className='card-header' ><h4>{props.mynote.title}</h4></Card.Header>

              {/* Display short excerpt of the note body */}
              <Card.Body className='card-background text' style={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  <blockquote className="blockquote mb-0">
                    <p dangerouslySetInnerHTML={{ __html: props.mynote.noteBody }} style={{ fontSize: '13px', lineHeight: '1' }}/>
                  </blockquote>
              </Card.Body>

              {/* Display created and edited dates */}
              <Card.Footer className="card-footer">
                <div style={{ fontSize: '10PX', display: 'flex', justifyContent: 'space-between' }}>
                  <span><strong>Created:</strong> {formatDate(props.mynote.dateCreated)}</span>
                  <span><strong>Edited:</strong> {formatDate(props.mynote.dateEdited)}</span>
                </div>
            </Card.Footer>

          {/* Modal to display full note */}
          </Card>
          {selectedNote && (
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
              <Modal.Header closeButton>
                <Modal.Title>{selectedNote.title}</Modal.Title>
              </Modal.Header>

              {/* Render the note body with HTML styling */}
              <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <h5>Note Body:</h5>
                <div dangerouslySetInnerHTML={{ __html: selectedNote.noteBody }} />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                {/* Link to the edit page for this note */}
                <Link to={"/editNote/" + selectedNote._id}>
                  <Button variant="primary">Edit</Button>
                </Link>

                {/* Delete button inside the modal */}
                <Button variant="danger" onClick={handleDeleteClick}>Delete</Button>
              </Modal.Footer>
            </Modal>
          )}

          {/* Confirmation Modal to confirm deletion */}
          {selectedNote && (
            <Modal show={showConfirmModal} onHide={handleCloseConfirmModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
              </Modal.Header>

              {/* Confirmation message */}
              <Modal.Body>
                <p>Are you sure you want to delete this note?</p>
              </Modal.Body>

              {/* Buttons for cancel/delete */}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseConfirmModal}>
                  Cancel
                </Button>

                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>

              </Modal.Footer>
            </Modal>
          )}
      </div>
    );

  };
  
  export default NoteItem;