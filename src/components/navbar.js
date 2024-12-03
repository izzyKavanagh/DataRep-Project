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
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
  
export default NavigationBar;