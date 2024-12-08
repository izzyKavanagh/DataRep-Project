import NoteItem from "./NoteItem";

const Notes = (props) => {

  return(
  <div className="container mt-4">
      {/* Bootstrap Row */}
      <div className="row">
        {props.myNotes.map((note) => (
          // Each note takes 1/3 of the row (col-4) with padding
          <div className="col-12 col-md-4 mb-4 px-3" key={note._id}>
            <NoteItem mynote={note} />
          </div>
        ))}
      </div>
    </div>
  );
};
  
  export default Notes; //exports Movies function so it can be imported and used in other files