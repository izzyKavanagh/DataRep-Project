import { useEffect, useState } from "react";
import axios from "axios";
import Grades from "./GradeCalc";

const ReadGradeCalculator = () => {
  const [gradecalcs, setGrades] = useState([]); // State to store grades

  // Fetch grades from the server
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/gradecalcs")
      .then((response) => {
        setGrades(response.data.gradecalcs); // Assuming API returns an object with gradeCalcs array
        console.log(response.data);//log response to console
      })
      .catch((error) => {
        console.error("Error fetching grades:", error);
      });
  }, []);

  return (
    <div>
      <h1>Grade Calculator</h1>
        <Grades myGrades={gradecalcs} />
    </div>
  );
};

export default ReadGradeCalculator;