//import bootstrap components for card formating 
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

const ModuleItem = (props) => {
    useEffect(() => {
        console.log("Module Item:", props.mymodule);
      }, [props.mymodule]); // Only run this effect when the mymovie prop changes

    return (
        <div>
            {/* Bootstrap Card component to display movie information */}
            <Card>
                {/* Card Header displays movie title */}
                <Card.Header>{props.mymodule.title}</Card.Header>
                {/* Card Body contains movie information */} 
                <Card.Body>
                    {/* Blockquote used to add movie poster and year */}
                    <blockquote className="blockquote mb-0">
                        <p>Exam 1 Score: {props.mymodule.exam1}</p>
                        <p>Exam 2 Score: {props.mymodule.exam2}</p>
                        <p>Total Score: {props.mymodule.exam1 + props.mymodule.exam2}</p>
                    </blockquote>
                </Card.Body>
           </Card>
        </div>
      );
  };
  
  export default ModuleItem; //exports MovieItem function so it can be imported and used in other files