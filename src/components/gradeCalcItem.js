import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Modal, Button } from "react-bootstrap";

const GradeItem = (props) => {

  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [editModule, setEditModule] = useState(props.mygradecalcs.module); // Module state
  const [editTitle, setEditTitle] = useState(props.mygradecalcs.title); // Title state

  const HandleDelete = () => {
    // API call to delete the grade by ID
    axios.delete(`http://localhost:4000/api/gradecalcs/${props.mygradecalcs._id}`)
    .then(() => {
      console.log("Deleted successfully");
      props.RefreshGrades(); 
    })
    .catch((err) => console.error("Error deleting grade:", err));
  };

  const handleEdit = () => {
    setShowModal(true); // Show the modal when Edit is clicked
  };

  const handleSave = () => {
    const updatedGrade = {
      ...props.mygradecalcs,
      module: editModule,
      title: editTitle,
    };

    axios
      .put(`http://localhost:4000/api/gradecalcs/${props.mygradecalcs._id}`, updatedGrade)
      .then((res) => {
        console.log("Updated successfully:", res.data);
        props.RefreshGrades(); // Refresh the grades
        setShowModal(false); // Close the modal
      })
      .catch((err) => console.error("Error updating grade:", err));
  };

  useEffect(() => {
    console.log("Grade Calculator Item:", props.mygradecalcs);
  }, [props.mygradecalcs]); // Only run this effect when the mymovie prop changes

  return (
    <div style={{  width: "100%", padding: "10px" }}>
      <Card style={{ borderRadius: "20px"}}>
        <Card.Header><h4>{props.mygradecalcs.module}</h4>
          {/* Edit button */}
          <button
            onClick={handleEdit}
            style={{
              position: "absolute",
              top: "4%",
              backgroundColor: "rgba(128, 128, 128, 0.8)",
              right: "15px",
              border: "none",
              borderRadius: "20px",
              fontSize: "10px", // Small font
              padding: "3px 8px", // Compact size
              cursor: "pointer",
            }}>
            Edit
          </button>
        </Card.Header>
        <Card.Body>
        <blockquote className="blockquote mb-0">
            <p>Title: {props.mygradecalcs.title}</p>
            <p>Grade: {props.mygradecalcs.grade}%</p>
            <p>Weighting: {props.mygradecalcs.weighting}%</p>
            <p>Contribution to Course Total: {props.mygradecalcs.result}%</p>
        </blockquote>
        </Card.Body>
        <Card.Footer style={{ position: "relative" }}>
            {/* Delete button in the bottom-right corner */}
            <button onClick={HandleDelete}
            style={{border: "1px solid black", borderRadius: "20px", cursor: "pointer", 
                fontSize: "12px", padding: "3px 8px", backgroundColor: "rgba(255, 0, 0, 0.6)"}}>
            Delete
            </button>
        </Card.Footer>
      </Card>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Grade Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Module</Form.Label>
              <Form.Control
                type="text"
                value={editModule}
                onChange={(e) => setEditModule(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  };
  
  export default GradeItem; 