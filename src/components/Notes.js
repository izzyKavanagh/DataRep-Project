import NoteItem from "./NoteItem";

const Notes = (props) => {
  return props.myNotes.map(
    (note)=>{
        //each object in myMovies array is passed to MovieItem
        return <NoteItem mynote={note} key={note._id}/> //passes object and unique key (_id)
    }
)
};
  
  export default Notes; //exports Movies function so it can be imported and used in other files