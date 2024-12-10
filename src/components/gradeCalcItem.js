import Card from "react-bootstrap/Card";
import { useEffect } from "react";

const GradeItem = (props) => {

    useEffect(() => {
        console.log("Grade Calculator Item:", props.mygradecalcs);
      }, [props.mygradecalcs]); // Only run this effect when the mymovie prop changes

    return (
      <div>
        <Card>
          <Card.Header>Grade Calculator</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>Grade: {props.mygradecalcs.grade}%</p>
              <p>Weighting: {props.mygradecalcs.weighting}%</p>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    );
  };
  
  export default GradeItem; 