import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";

const CreateGradeCalc = ({ addGrade }) => {

    // useState to manage the title, year, and poster values for the movie
    const [module, setModule] = useState('');
    const [title, setTitle] = useState('');
    const [grade, setGrade] = useState('');
    const [weighting, setWeighting] = useState('');

     // Function calculate result
    const calculateResult = (grade, weighting) => {
        return (grade * weighting) / 100;
    };

    // Handle form submission, calculate result, and make POST request to the backend
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = calculateResult(grade, weighting);

        console.log(`Module: ${module}, Title: ${title}, Grade: ${grade}, Weighting: ${weighting}, Result: ${result}`);
        const newGrade = { module: module, title: title, grade: grade, weighting: weighting, result: result };

        // Make a POST request to add data to the backend database
        axios.post('http://localhost:4000/api/gradecalcs', newGrade)
        .then((res) => {console.log(res.data); 
            addGrade(res.data);
            calculateResult(grade, weighting);

            // Reset form fields after submission
            setModule('');
            setTitle('');
            setGrade('');
            setWeighting('');}) 
        .catch((err) => console.log(err.data)); 

    };
  
    return (
        //card that displays a form to get input from the user when using grade calculator
        <Card className='card-formatting' style={{ width: "300px" }}>
            <Card.Header className="card-header" style={{ color: "white", textAlign: "center", fontWeight: "bold" }} >
                Calculate Grade Contribution to Module Total
            </Card.Header>
            <Card.Body className="card-background" style={{padding: "40px"}}>
                <form className="text" onSubmit={handleSubmit}>
                    {/* Input fields for the movie details */}
                    <div className="form-group"  style={{ marginBottom: "15px" }}>
                        {/* Input for the movie title */}
                        <label style={{ marginBottom: "5px"}}>Enter Module: </label>
                        <input type="text" placeholder="..."
                            className="form-control search-bar input-box"
                            value={module} 
                            onChange={(e) => { setModule(e.target.value) }}
                            required />
                    </div>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        {/* Input for the movie year */}
                        <label style={{ marginBottom: "5px"}}>Enter Title: </label>
                        <input type="text" placeholder="..."
                            className="form-control search-bar input-box"
                            value={title} 
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        {/* Input for the movie poster */}
                        <label style={{ marginBottom: "5px"}}>Enter Grade: </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <input type="number" placeholder="..."
                                className="form-control search-bar input-box"
                                value={grade} 
                                onChange={(e) => { setGrade(e.target.value) }}
                                style={{ width: "70px" }}
                            />
                            <span>%</span>
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: "40px" }}>
                        {/* Input for the movie poster */}
                        <label style={{ marginBottom: "5px"}} >Enter Weighting: </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <input type="Number" placeholder="..."
                                className="form-control search-bar input-box"
                                value={weighting} 
                                onChange={(e) => { setWeighting(e.target.value) }}
                                style={{ width: "70px" }}
                            />
                            <span>%</span>
                        </div>
                    </div >
                    {/* Submit button to trigger the form submission */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <input className="add-button input-box delete-button" type="submit" value="Save Grade" style={{borderRadius: "20px", margin: "10px 20px", padding: "10px"}}/>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
};

export default CreateGradeCalc;