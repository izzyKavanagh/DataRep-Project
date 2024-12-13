import Notes from "./Notes";
import { useEffect, useState } from "react"; 
import axios from "axios";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const ReadNotes = () => {
  // State to manage list of notes and search query
  const [notes, setNotes] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");

  // reload notes after a deletion by fetching from database
  const ReloadNotes = () => {
    axios.get("http://localhost:4000/api/notes")
      .then((response) => {
        setNotes(response.data.notes); // Update notes after deletion
      })
      .catch((error) => {
        console.log("Error reloading notes:", error);
      });
  };

  //react hook that fetches data when component mounts
  useEffect(()=>{
    axios.get('http://localhost:4000/api/notes')
    .then((response)=>{ 
      console.log(response.data);
      setNotes(response.data.notes); 
    })
    .catch((error)=>{
      console.log(error); 
    });
    ReloadNotes();
  },[]); //effect only runs once when component mounts

  // Filter the notes based on the search query (title)
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
        {/* Pass notes to the Notes component & display */}
        <Row>
          <Notes myNotes={filteredNotes} ReloadData={ReloadNotes}/>
        </Row>
      </Container>
    </div>
  );
};
  
export default ReadNotes;