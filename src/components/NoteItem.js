//import bootstrap components for card formating 
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';

const NoteItem = (props) => {

  const formatDate = (date) => {
    if (!date) return 'N/A'; // Handle missing dates
      return new Date(date).toLocaleDateString('en-GB');
  };

  useEffect(() => {
      console.log("Module Item:", props.mynote);
    }, [props.mynote]); // Only run this effect when the mymovie prop changes

  return (
      <div>
          {/* Bootstrap Card component to display movie information */}
          <Card>
              {/* Card Header displays movie title */}
              <Card.Header><h3>{props.mynote.title}</h3></Card.Header>
              {/* Card Body contains movie information */} 
              <Card.Body style={{ maxHeight: '200px', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {/* Blockquote used to add movie poster and year */}
                  <blockquote className="blockquote mb-0">
                    <p dangerouslySetInnerHTML={{ __html: props.mynote.noteBody }} style={{ fontSize: '13px', lineHeight: '1' }}/>
                  </blockquote>
              </Card.Body>
              <Card.Footer className="text-muted">
                <div style={{ fontSize: '10PX', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>Created:</strong> {formatDate(props.mynote.dateCreated)}</span>
                    <span><strong>Edited:</strong> {formatDate(props.mynote.dateEdited)}</span>
                </div>
            </Card.Footer>
          </Card>
      </div>
    );

  };
  
  export default NoteItem; //exports MovieItem function so it can be imported and used in other files