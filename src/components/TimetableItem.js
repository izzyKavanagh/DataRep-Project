//import bootstrap components for card formating 
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

const TimetableItem = (props) => {
    useEffect(() => {
        console.log("Timetable Item:", props.mytimetable);
      }, [props.mytimetable]); // Only run this effect when the mymovie prop changes

      return (
        <div>
            {/* Bootstrap Card component to display timetable information */}
            <Card>
                {/* Card Header displays subject name */}
                <Card.Header>{props.mytimetable.subject}</Card.Header>
                {/* Card Body contains start and end time and details */}
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p><strong>Time:</strong> {props.mytimetable.startTime} - {props.mytimetable.endTime}</p>
                    </blockquote>
                </Card.Body>
            </Card>
        </div>
      );
  };
  
  export default TimetableItem; //exports MovieItem function so it can be imported and used in other files