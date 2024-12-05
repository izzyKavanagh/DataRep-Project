import { useState } from "react";
import axios from "axios";

const Timetable = () => {
  // State to manage the timetable entries
  const [subject, setSubject] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timetable, setTimetable] = useState([]);
}

const handleAddTimetable = (e) => {
    e.preventDefault();
    const newEntry = { subject, startTime, endTime };
}

export default Timetable;