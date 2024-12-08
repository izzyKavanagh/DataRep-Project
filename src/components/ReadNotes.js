//import components
import Notes from "./Notes";
// Import React hooks
import { useEffect, useState } from "react"; 
//import axios
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap";

// Define the Read component
const ReadNotes = () => {
  const [notes, setNotes] = useState([]); //react hook used to manage the state of the movies variable
  const [searchQuery, setSearchQuery] = useState("");

  //react hook that fetches data
  useEffect(()=>{
    //Make axios (library that supports HTTP requests) GET request (HTTP request) to the provided URL to retrieve movie data
    axios.get('http://localhost:4000/api/notes')
    .then((response)=>{ 
      console.log(response.data);//log response to console
      setNotes(response.data.notes); // Update state with the movie data received from API
    })
    .catch((error)=>{ // Handle any errors that occur during the API request
      console.log(error); //log them to console
    });
  },[]);

  return (
    <div>
      {/* Container to hold the search bar and notes */}
      <Container>
        <Row className="mb-4" style={{ marginTop: '20px' }}>
          <Col>
            {/* Search bar */}
            <Form.Control type="text" placeholder="Search for notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </Col>
        </Row>

        {/* Display the notes */}
        <Row>
          <Notes myNotes={notes} />
        </Row>
      </Container>
    </div>
  );
};
  
  export default ReadNotes; //export components