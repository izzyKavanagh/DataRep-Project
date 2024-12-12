import { useEffect, useState } from "react";
import axios from "axios";
import Grades from "./GradeCalc";
import CreateGradeCalc from "./CreateGradeCalc";

const ReadGradeCalculator = () => {
    const [gradecalcs, setGrades] = useState([]); // State to store grades

    // Function to fetch the updated grades
    const RefreshGrades = () => {
        axios.get("http://localhost:4000/api/gradecalcs")
        .then((response) => setGrades(response.data.gradecalcs))
        .catch((error) => console.error("Error refreshing grades:", error));
    };
  // Fetch grades from the server
    const fetchGrades = () => {
        axios.get("http://localhost:4000/api/gradecalcs")
        .then((response) => {
            setGrades(response.data.gradecalcs); // Assuming API returns an object with gradeCalcs array
            console.log(response.data);//log response to console
        })
        .catch((error) => {
            console.error("Error fetching grades:", error);
        });
    };

    useEffect(() => {
        fetchGrades();
        RefreshGrades();
    }, []);

    const addGrade = (newGrade) => {
        fetchGrades(); // Re-fetch the grades after adding a new grade
    };

  return (
    <div style={styles.pageContainer}>
        {/* Create Grade Calculator form */}
        <div style={styles.formContainer}>
            <h1 style={styles.formTitle} >Grade Calculator</h1>
            <CreateGradeCalc addGrade={addGrade}/>
        </div>

        <div style={styles.gradeContainer}>
            <h1 style={{color:'black'}}>Saved Grades</h1>
            <Grades myGrades={gradecalcs} OnDelete={RefreshGrades} />
        </div>
    </div>
  );

};

const styles = {
    pageContainer: {
      display: "flex", 
      justifyContent: "space-between",
      alignItems: "flex-start",
      minHeight: "100vh", 
      padding: "30px",
    },
    formContainer: {
        flexBasis: "45%",
        marginRight: "20px", 
        display: "flex",
        flexDirection: "column", 
        justifyContent: "flex-start", 
        alignItems: "center", 
        maxWidth: "500px",
    },
    gradeContainer: {
      flexBasis: "50%", 
      display: "flex",
      flexDirection: "column", 
      alignItems: "center", 
      padding: "20px", 
      maxHeight: "550px",
      overflowY: "scroll", 
      backgroundColor: "rgba(110, 109, 109, 0.7)", 
      borderRadius: "20px", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
      marginTop: "65px",
      border: "1px solid white"
    },
    formTitle: {
        textAlign: "center", 
        marginBottom: "20px",
        color: "rgb(50, 168, 82)",
    },
}

export default ReadGradeCalculator;