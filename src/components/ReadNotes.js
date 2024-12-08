//import components
import Notes from "./Notes";
// Import React hooks
import { useEffect, useState } from "react"; 
//import axios
import axios from "axios";

// Define the Read component
const ReadNotes = () => {
  const [notes, setNotes] = useState([]); //react hook used to manage the state of the movies variable
  //movies holds the current state (will hold array of movie data retrieved from an API - initially an empty array)
  //setMovies function is used to update the movies value

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
        {/* display h3 message */}
        <h3>Read component</h3>
        {/* Pass the fetched movies data to the Movies component as a prop */}
        <Notes myNotes={notes}/> 
        {/* Include Footer component */}
      </div>
    );
  };
  
  export default ReadNotes; //export components