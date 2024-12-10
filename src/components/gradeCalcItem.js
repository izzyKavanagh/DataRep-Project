import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import axios from "axios";

const GradeItem = (props) => {

  const HandleDelete = () => {
    // API call to delete the grade by ID
    axios.delete(`http://localhost:4000/api/gradecalcs/${props.mygradecalcs._id}`)
    .then(() => {
      console.log("Deleted successfully");
      props.RefreshGrades(); 
    })
    .catch((err) => console.error("Error deleting grade:", err));
  };

  useEffect(() => {
    console.log("Grade Calculator Item:", props.mygradecalcs);
  }, [props.mygradecalcs]); // Only run this effect when the mymovie prop changes

  return (
    <div style={{  width: "100%", padding: "10px" }}>
      <Card style={{ borderRadius: "20px"}}>
        <Card.Header>{props.mygradecalcs.module}</Card.Header>
        <Card.Body>
        <blockquote className="blockquote mb-0">
            <p>Title: {props.mygradecalcs.title}</p>
            <p>Grade: {props.mygradecalcs.grade}%</p>
            <p>Weighting: {props.mygradecalcs.weighting}%</p>
            <p>Result: {props.mygradecalcs.result}%</p>
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
    </div>
    );
  };
  
  export default GradeItem; 