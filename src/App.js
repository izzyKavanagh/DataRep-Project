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
import ReadNotes from './components/ReadNotes.js';
import CreateNote from './components/CreateNote.js';
import EditNote from './components/EditNote.js';
import ReadGradeCalculator from './components/ReadGradeCalculator.js';

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
        <Route path="/notes" element={<ReadNotes />} />
        <Route path="/createNote" element={<CreateNote />} />
        <Route path="/editNote/:id" element={<EditNote />} />
        <Route path="/gradecalcs" element={<ReadGradeCalculator />} />
      </Routes>
    </Router>
  );
}

export default App;
