import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Form, Modal, Button } from "react-bootstrap";

const GradeItem = (props) => {

  // State variables for modal visibility and input fields for editing grade details
  const [showModal, setShowModal] = useState(false); 
  const [editModule, setEditModule] = useState(props.mygradecalcs.module);
  const [editTitle, setEditTitle] = useState(props.mygradecalcs.title); 
  const [editGrade, setEditGrade] = useState(props.mygradecalcs.grade); 
  const [editWeighting, setEditWeighting] = useState(props.mygradecalcs.weighting);

  // Handle grade deletion with API call to delete the grade by ID
  const HandleDelete = () => {
    axios.delete(`http://localhost:4000/api/gradecalcs/${props.mygradecalcs._id}`)
    .then(() => {
      console.log("Deleted successfully");
      props.RefreshGrades(); // Refresh the grades list after deletion
    })
    .catch((err) => console.error("Error deleting grade:", err));
  };

  // Show the modal when Edit is clicked
  const handleEdit = () => {
    setShowModal(true); 
  };

  // Save the edited grade details
  const handleSave = () => {

    // Calculate the updated result based on grade and weighting
    const updatedResult = (editGrade * editWeighting)/100; 

    // Prepare the updated grade object
    const updatedGrade = {
      ...props.mygradecalcs,
      module: editModule,
      title: editTitle,
      grade: editGrade,
      weighting: editWeighting,
      result: updatedResult
    };

    //API call to update the grade in the backend
    axios.put(`http://localhost:4000/api/gradecalcs/${props.mygradecalcs._id}`, updatedGrade)
      .then((res) => {
        console.log("Updated successfully:", res.data);
        props.RefreshGrades(); 
        setShowModal(false); // Close the modal
      })
      .catch((err) => console.error("Error updating grade:", err));
  };

  // Log the grade item details whenever the `mygradecalcs` prop changes
  useEffect(() => {
    console.log("Grade Calculator Item:", props.mygradecalcs);
  }, [props.mygradecalcs]); 

  return (
    //display grade calculator details 
    <div style={{  width: "100%", padding: "10px" }}>
      <Card className="card-formatting">
        <Card.Header className="card-header" ><h4>{props.mygradecalcs.module}</h4>
        
          {/* Edit button to trigger modal */}
          <button
            className="delete-button"
            onClick={handleEdit}
            style={{
              position: "absolute",
              top: "4%",
              backgroundColor: "rgba(128, 128, 128, 0.8)",
              right: "15px",
              border: "1px solid black",
              borderRadius: "20px",
              fontSize: "10px", 
              padding: "3px 8px", 
              cursor: "pointer",
            }}>
            Edit
          </button>
        </Card.Header>
        <Card.Body className="card-background" >
        <blockquote className="blockquote mb-0 text">
            <p>Title: {props.mygradecalcs.title}</p>
            <p>Grade: {props.mygradecalcs.grade}%</p>
            <p>Weighting: {props.mygradecalcs.weighting}%</p>
            <p>Contribution to Module Total: {props.mygradecalcs.result}%</p>
        </blockquote>
        </Card.Body>
        <Card.Footer style={{ position: "relative" }}>
            {/* Delete button to remove grade */}
            <button onClick={HandleDelete}
            className="delete-button"
            style={{border: "1px solid black", borderRadius: "20px", cursor: "pointer", 
                fontSize: "12px", padding: "3px 8px", backgroundColor: "rgba(207, 207, 207, 0.6)"}}>
            Delete
            </button>
        </Card.Footer>
      </Card>

      {/* Modal for editing grade details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Grade Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form for editing grade details */}
          <Form>

            {/* edit module */}
            <Form.Group className="mb-3">
              <Form.Label>Module</Form.Label>
              <Form.Control
                type="text"
                value={editModule}
                onChange={(e) => setEditModule(e.target.value)}
              />
            </Form.Group>

            {/* edit title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Form.Group>

            {/* edit grade */}
            <Form.Group className="mb-3">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                value={editGrade}
                onChange={(e) => setEditGrade(e.target.value)}
              />
            </Form.Group>

            {/* edit weighting */}
            <Form.Group className="mb-3">
              <Form.Label>Weighting</Form.Label>
              <Form.Control
                type="number"
                value={editWeighting}
                onChange={(e) => setEditWeighting(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Cancel and Save buttons in the modal */}
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