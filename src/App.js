import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navbar.js';
import AppContent from './components/appContent.js';
import Create from './components/Create.js';
import Read from './components/Read.js';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<AppContent />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </Router>
  );
}

export default App;
