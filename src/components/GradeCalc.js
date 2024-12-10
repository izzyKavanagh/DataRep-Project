import GradeItem from "./GradeCalcItem";

const Grades = (props) => {
    return props.myGrades.map(
        (gradecalc) => {
            return <GradeItem mygradecalcs={gradecalc} key={gradecalc._id} />
        }
    );
}

export default Grades;
