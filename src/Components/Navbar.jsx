import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus } from 'react-icons/fa6';

function NavBar() {
  let Navigate = useNavigate()
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link to="/" as={Link}>Home</Nav.Link>
            <Nav.Link to="/login/user:Kesavan" as={Link}> Login</Nav.Link>
            <Nav.Link to="/signup" as={Link}>Signup</Nav.Link>
            <Nav.Link to="/product" as={Link}> Products</Nav.Link>
            <Nav.Link to="/todo" as={Link}>Todo</Nav.Link>
          </Nav>
          <Form className="d-flex">
          <Button className="bg-warning" onClick={()=>Navigate("/wishlist")}><FaCartPlus /></Button>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
