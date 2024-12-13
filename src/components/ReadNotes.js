//import components
import Notes from "./Notes";
// Import React hooks
import { useEffect, useState } from "react"; 
//import axios
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Define the Read component
const ReadNotes = () => {
  const [notes, setNotes] = useState([]); //react hook used to manage the state of the movies variable
  const [searchQuery, setSearchQuery] = useState("");

  // Reload notes after a deletion
  const ReloadNotes = () => {
    axios.get("http://localhost:4000/api/notes")
      .then((response) => {
        setNotes(response.data.notes); // Update notes after deletion
      })
      .catch((error) => {
        console.log("Error reloading notes:", error);
      });
  };

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
    ReloadNotes();
  },[]);

  // Filter the notes based on the search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Container to hold the search bar and notes */}
      <Container>
        <Row className="mb-4">
          <Col>
            {/* Search bar */}
            <Form.Control className="search-bar card-formatting" type="text" style={{ marginTop: '20px' }} placeholder="Search Your Notes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </Col>
        </Row>
          {/* Create New Note Button */}
          <Link to="/createNote" className="add-button card-formatting" style={{ padding: '10px 15px', fontSize: '16px', 
            marginBottom: '20px', borderRadius: '50px', display: 'inline-block', color: 'white', textDecoration: 'none' }}>
              New Note +
          </Link>
        {/* Display the notes */}
        <Row>
          <Notes myNotes={filteredNotes} ReloadData={ReloadNotes}/>
        </Row>
      </Container>
    </div>
  );
};
  
export default ReadNotes; //export components