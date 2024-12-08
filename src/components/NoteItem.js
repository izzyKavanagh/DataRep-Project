//import bootstrap components for card formating 
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

const NoteItem = (props) => {

    useEffect(() => {
        console.log("Module Item:", props.mynote);
      }, [props.mynote]); // Only run this effect when the mymovie prop changes

    return (
        <div>
            {/* Bootstrap Card component to display movie information */}
            <Card>
                {/* Card Header displays movie title */}
                <Card.Header>{props.mynote.title}</Card.Header>
                {/* Card Body contains movie information */} 
                <Card.Body>
                    {/* Blockquote used to add movie poster and year */}
                    <blockquote className="blockquote mb-0">
                        <p>Date Created: {props.mynote.dateCreeated}</p>
                        <p>Date Created: {props.mynote.dateEdited}</p>
                        <p>Note Body: {props.mynote.noteBody}</p>
                    </blockquote>
                </Card.Body>
           </Card>
        </div>
      );

  };
  
  export default NoteItem; //exports MovieItem function so it can be imported and used in other files