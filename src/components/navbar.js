import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    //create bootsrap navbar component 
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">MainPage</Nav.Link>
          <Nav.Link href="/todolist">To-Do List</Nav.Link>
          {/*<Nav.Link href="/createModule">Grade Tracker</Nav.Link> */}
          {/*<Nav.Link href="/read">GradeTracker</Nav.Link> */}
          {/* <Nav.Link href="/timetables">Timetables</Nav.Link> */}
          {/*<Nav.Link href="/createTimetable">Create Timetables</Nav.Link>*/}
        </Nav>
      </Container>
    </Navbar>
  );
};
  
export default NavigationBar;