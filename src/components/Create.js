import axios from "axios";
import { useState } from "react";

const Create = () => {

  const [title, setTitle] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault(); // Prevents the default form submission behavior (page reload)
    console.log(`Title: ${title}`);//log values to the console
    // Create a movie object using the current state values
    const module = {
      title: title
    };
      
    // Make a POST request to add the movie to the backend database
    axios.post('http://localhost:4000/api/modules', module)
      .then((res) => console.log(res.data)) // Log success response
      .catch((err) => console.log(err.data)); // Log error response if request fails
  }
  return (
    <div>
      {/* Display heading for the component */}
      <h2>This is my Create Component</h2>
      {/* Form element to capture user input and trigger handleSubmit function on submit */}
      <form onSubmit={handleSubmit}>
        {/* Input fields for the movie details */}
        <div className="form-group">
          {/* Input for the movie title */}
          <label>Add Module Title: </label>
          <input type="text"
            className="form-control"
            value={title} //input bound to title state
            onChange={(e) => { setTitle(e.target.value) }} // Update title state on change
          />
        </div>
        {/* Submit button to trigger the form submission */}
        <input type="submit" value="Add Module" />
      </form>
    </div>
  );
};

export default Create;