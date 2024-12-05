import { useState } from "react";
import axios from "axios";

const Timetable = () => {

    // State to manage the timetable entries
    const [subject, setSubject] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [timetable, setTimetable] = useState([]);


    const handleAddTimetable = (e) => {
        e.preventDefault();
        const newEntry = { subject, startTime, endTime };
    }
    axios.post('http://localhost:4000/api/timetable', newEntry)
    .then((res) => console.log(res.data)) // Log success response
    .catch((err) => console.log(err.data)); // Log error response if request fails

    return (
        <div>
          <h2>Study Timetable</h2>
    
          {/* Form to add a new timetable entry */}
          <form onSubmit={handleAddTimetable}>
            <div className="form-group">
              <label>Subject:</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
    
            <div className="form-group">
              <label>Start Time:</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
    
            <div className="form-group">
              <label>End Time:</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
    
            <button type="submit">Add Study Session</button>
          </form>
        </div>
    );
};
export default Timetable;