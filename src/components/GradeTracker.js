// Import MovieItem component 
import ModuleItem from "./ModuleItem";
//reusable component 'Movies'

//arrow 'Movies' function that receives props variable and passes content to MovieItem and displays it
const Modules = (props) => {
    return props.myModules.map( //iterate over every object in myMovies array using .map() function
        (module)=>{
            //each object in myMovies array is passed to MovieItem
            return <ModuleItem mymodule={module} key={module._id}/> //passes object and unique key (_id)
        }
    )
  };
  
  export default Modules; //exports Movies function so it can be imported and used in other files