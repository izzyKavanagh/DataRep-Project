import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppContent from './components/AppContent';
import NavigationBar from './components/navbar.js';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/home" element={<AppContent />} />
      </Routes>
    </Router>
  );
}

export default App;
