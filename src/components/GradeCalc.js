import GradeItem from "./GradeCalcItem";

// function that renders each gradecalc item
const Grades = (props) => {
    // Loop through each item in the `myGrades` array and pass as prop to GradeItem.js
    return props.myGrades.map(
        (gradecalc) => {
            return <GradeItem mygradecalcs={gradecalc} key={gradecalc._id} RefreshGrades={props.OnDelete}/> 
        }
    );
}

export default Grades;
