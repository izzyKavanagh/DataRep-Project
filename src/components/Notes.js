import NoteItem from "./NoteItem";

// function that renders each note item
const Notes = (props) => {
  return(
  <div className="container mt-4">
      <div className="row">
        {/*Loop through each item in `myNotes` array and pass as prop to NoteItem.js*/}
        {props.myNotes.map((note) => (
          // Each note takes 1/3 of the row (col-4) with padding
          <div className="col-12 col-md-4 mb-4 px-3" key={note._id}>
            <NoteItem mynote={note} ReloadNotes={props.ReloadData} />
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default Notes; 