// Import MovieItem component 
import TimetableItem from "./TimetableItem";
//reusable component 'Movies'

//arrow 'Movies' function that receives props variable and passes content to MovieItem and displays it
const Timetables = (props) => {
    return props.myTimetables.map(
        (timetable)=>{
            //each object in myMovies array is passed to MovieItem
            return <TimetableItem mytimetable={timetable} key={timetable._id}/> //passes object and unique key (_id)
        }
    )
  };
  
  export default Timetables; //exports Movies function so it can be imported and used in other files