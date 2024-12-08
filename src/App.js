//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navbar.js';
import WelcomePage from './components/WelcomePage.js';
import CreateModuleItem from './components/CreateModuleItem.js';
import GradeTracker from './components/GradeTracker.js';
import ReadTimetables from './components/ReadTimetable.js';
import CreateTimetable from './components/CreateTimetable.js';
import ReadToDoList from './components/ReadToDoList.js';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<WelcomePage />} />
        <Route path="/createModule" element={<CreateModuleItem />} />
        <Route path="/read" element={<GradeTracker />} />
        <Route path="/timetables" element={<ReadTimetables />} />
        <Route path="/createTimetable" element={<CreateTimetable />} />
        <Route path="/todolist" element={<ReadToDoList />} />
      </Routes>
    </Router>
  );
}

export default App;
