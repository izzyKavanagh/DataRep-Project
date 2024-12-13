import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import "../Navbar.css";

const NavigationBar = () => {
  return (
    //create bootsrap navbar component 
    <Navbar className='navbar'>
      <Container >
        <Nav className="nav-links">
          <li><Nav.Link className='navbar-links' href="/">MainPage</Nav.Link></li>
          <li><Nav.Link href="/todolist">To-Do List</Nav.Link></li>
          <li><Nav.Link href="/notes">Notes</Nav.Link></li>
          <li><Nav.Link href="/gradecalcs">Grade Calculator</Nav.Link></li>
        </Nav>
      </Container>
    </Navbar>
  );
};
  
export default NavigationBar;