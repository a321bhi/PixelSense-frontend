import HeaderDarkSwitch from "./HeaderDarkSwitch";
import LogoutSwitch from "./LogoutSwitch";
import { Navbar,Container,Offcanvas,Nav,Form,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faIdCard} from "@fortawesome/free-solid-svg-icons";
function NavbarComponent(){
    const navigate = useNavigate();
function messageIconClick(){
    navigate('/chats');   
}
function profilePageClick(){
    navigate('/profile',);
}
    return <Navbar className="w-100" expand={'lg'} >
    <Container fluid>
      <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-lg"} />
      <Navbar.Offcanvas
        id={"offcanvasNavbar-expand-lg"}
        aria-labelledby={"offcanvasNavbar-expand-lg"}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id={"offcanvasNavbar-expand-lg"}>
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form className="d-flex w-100 justify-content-center">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 w-25"
              aria-label="Search"
            />
            
          </Form>
          <Nav className="justify-content-end flex-grow-1 pe-3 text-light">
           
            <Nav.Link type="button" onClick={messageIconClick}><FontAwesomeIcon icon={faCommentDots} size="2x"/></Nav.Link>
            <Nav.Link data-bs-toggle="modal" data-bs-target="#uploadMediaModal"><FontAwesomeIcon icon={faCameraRetro} size="2x"/></Nav.Link>
            <Nav.Link onClick={profilePageClick}><FontAwesomeIcon icon={faIdCard} size="2x"/></Nav.Link>
            <Nav.Link><LogoutSwitch/></Nav.Link>
          </Nav>

          {/* <HeaderDarkSwitch/> */}
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
}
export default NavbarComponent;