import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navbar.js';
import WelcomePage from './components/WelcomePage.js';
import Create from './components/Create.js';
import GradeTracker from './components/GradeTracker.js';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<WelcomePage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<GradeTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
