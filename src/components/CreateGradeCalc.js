import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Button, Form } from "react-bootstrap";

const CreateGradeCalc = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Module: ${module}, Title: ${title}, Grade: ${grade}, Weighting: ${weighting}`);
        const newGrade = { module: module, title: title, grade: grade, weighting: weighting };

        // Make a POST request to add data to the backend database
        axios.post('http://localhost:4000/api/gradecalcs', movie)
        .then((res) => console.log(res.data)) 
        .catch((err) => console.log(err.data)); 

    };
  
    return (
        <form onSubmit={handleSubmit}>
            {/* Input fields for the movie details */}
            <div className="form-group">
                {/* Input for the movie title */}
                <label>Enter Module: </label>
                <input type="text"
                    className="form-control"
                    value={module} //input bound to title state
                />
                {/* Input for the movie year */}
                <label>Enter Title: </label>
                <input type="text"
                    className="form-control"
                    value={title}  //input bound to year state
                />
                {/* Input for the movie poster */}
                <label>Enter Grade: </label>
                <input type="number"
                    className="form-control"
                    value={grade}  //input bound to poster state
                />
                {/* Input for the movie poster */}
                <label>Enter Weighting: </label>
                <input type="Number"
                    className="form-control"
                    value={weighting}  //input bound to poster state
                />
            </div>
            {/* Submit button to trigger the form submission */}
            <input type="submit" value="Save Grade" />
        </form>
    );
};

export default CreateGradeCalc;