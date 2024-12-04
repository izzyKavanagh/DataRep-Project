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
                <Card.Header>{props.mymodule.Title}</Card.Header>
                {/* Card Body contains movie information */} 
                <Card.Body>
                    {/* Blockquote used to add movie poster and year */}
                    <blockquote className="blockquote mb-0">
                        <h1>hello from module card</h1>
                    </blockquote>
                </Card.Body>
           </Card>
        </div>
      );
  };
  
  export default ModuleItem; //exports MovieItem function so it can be imported and used in other files