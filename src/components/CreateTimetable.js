import { useState } from "react";
import axios from "axios";

const Timetable = () => {
  // State to manage the timetable entries
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timetable, setTimetable] = useState([]);
}

export default Timetable;