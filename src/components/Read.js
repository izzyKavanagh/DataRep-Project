import Modules from "./GradeTracker";
//reusable component 'Read'

//arrow 'Read' function that returns json "movies" content when called 
const Read = () => {
  //json content: array of movie objects with Title, Year, imdbID, Type, Poster
  const data = [
    {
      "Title": "Module Title",
      "mID": "g00"
    }
  ];

  return ( //returns h3 message and displays content
    <div>
        <h3>Read component</h3>
        {/* displays Movies component with 'data' array passed as 'myMovies' prop */}
        <Modules myModules={data}/> 
        {/* displays footer content */}
    </div>
  );
    
};

export default Read; // Export Read component