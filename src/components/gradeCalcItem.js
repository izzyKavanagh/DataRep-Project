import Card from "react-bootstrap/Card";
import { useEffect } from "react";

const GradeItem = (props) => {

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
        </Card>
      </div>
    );
  };
  
  export default GradeItem; 