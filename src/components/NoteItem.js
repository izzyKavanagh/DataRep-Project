//import bootstrap components for card formating 
import React from 'react';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NoteItem = (props) => {

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for delete confirmation modal
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

  const handleDeleteClick = () => {
    setShowConfirmModal(true); // Show the confirmation modal
  };

  // Close the confirmation modal
  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false); // Close the confirmation modal
  };

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
          {/* Bootstrap Card component to display movie information */}
          <Card onClick={handleCardClick} style={{ cursor: 'pointer' }}>
              {/* Card Header displays movie title */}
              <Card.Header className='card-header' ><h4>{props.mynote.title}</h4></Card.Header>

              {/* Card Body contains movie information */} 
              <Card.Body className='card-background text' style={{ maxHeight: '150px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {/* Blockquote used to add movie poster and year */}
                  <blockquote className="blockquote mb-0">
                    <p dangerouslySetInnerHTML={{ __html: props.mynote.noteBody }} style={{ fontSize: '13px', lineHeight: '1' }}/>
                  </blockquote>
              </Card.Body>

              <Card.Footer className="card-footer">
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

          <Modal.Body>
            <p>Are you sure you want to delete this note?</p>
          </Modal.Body>

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
  
  export default NoteItem; //exports MovieItem function so it can be imported and used in other files