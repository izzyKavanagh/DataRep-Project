import Modules from "./GradeTracker";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [modules, setModules] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:4000/api/modules')
      .then((response) => {
        console.log(response.data);
        setModules(response.data.modules);
      })
      .catch((error) => {
        console.log(error);
      });
  });

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