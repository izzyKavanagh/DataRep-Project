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
            //reset form fields
            setModule('');
            setTitle('');
            setGrade('');
            setWeighting('');}) 
        .catch((err) => console.log(err.data)); 

    };
  
    return (
        <Card style={{ width: "300px" }}>
            <Card.Header className="card-header" style={{ textAlign: "center", fontWeight: "bold" }} >
                Calculate Grade Contribution to Course Total
            </Card.Header>
            <Card.Body className="card-background" style={{padding: "40px"}}>
                <form onSubmit={handleSubmit}>
                    {/* Input fields for the movie details */}
                    <div className="form-group"  style={{ marginBottom: "15px" }}>
                        {/* Input for the movie title */}
                        <label style={{ marginBottom: "5px"}}>Enter Module: </label>
                        <input type="text"
                            className="form-control  search-bar"
                            value={module} //input bound to title state
                            onChange={(e) => { setModule(e.target.value) }}
                            required/>
                    </div>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        {/* Input for the movie year */}
                        <label style={{ marginBottom: "5px"}}>Enter Title: </label>
                        <input type="text"
                            className="form-control  search-bar"
                            value={title}  //input bound to year state
                            onChange={(e) => { setTitle(e.target.value) }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: "15px" }}>
                        {/* Input for the movie poster */}
                        <label style={{ marginBottom: "5px"}}>Enter Grade: </label>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            <input type="number"
                                className="form-control  search-bar"
                                value={grade}  //input bound to poster state
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
                            <input type="Number"
                                className="form-control search-bar"
                                value={weighting}  //input bound to poster state
                                onChange={(e) => { setWeighting(e.target.value) }}
                                style={{ width: "70px" }}
                            />
                            <span>%</span>
                        </div>
                    </div >
                    {/* Submit button to trigger the form submission */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <input className="add-button" type="submit" value="Save Grade" style={{ border:"1.5px solid", borderRadius: "20px", margin: "10px 20px", padding: "10px"}}/>
                    </div>
                </form>
            </Card.Body>
        </Card>
    );
};

export default CreateGradeCalc;