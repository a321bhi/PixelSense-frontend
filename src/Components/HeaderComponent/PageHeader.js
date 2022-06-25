import HeaderDarkSwitch from "./HeaderDarkSwitch";
import HeaderName from "./HeaderName";
import { UserContext } from "../Contexts/UserContext";
import LogoutSwitch from "./LogoutSwitch";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar,Container,Offcanvas,Nav,Form,Button } from "react-bootstrap";
function PageHeader(){
    let userCtx = useContext(UserContext);
const navigate = useNavigate();
function messageIconClick(){
    navigate('/chats');   
}
function profilePageClick(){
    navigate('/profile');
}
return(
    <div className="container-fluid text-white bg-primary">
        <HeaderName/>
        
        {/* {userCtx.username.length!==0?<LogoutSwitch/>:""}
        {userCtx.username.length!==0?<button type="button" className="btn-secondary" onClick={messageIconClick}>Chats</button>:""}
        {userCtx.username.length!==0?<button className="btn-secondary" href="#" data-bs-toggle="modal" data-bs-target="#uploadMediaModal">Upload</button>:""} */}
        {userCtx.username.length!==0?
        <Navbar className="bg-dark mb-3" expand={'lg'}>
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
              <Form className="d-flex w-25">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <Nav className="justify-content-end flex-grow-1 pe-3 text-light">
                 
                  <Nav.Link className={"text-info"} type="button" onClick={messageIconClick}>Chats</Nav.Link>
                  <Nav.Link className={"text-info"} href="#" data-bs-toggle="modal" data-bs-target="#uploadMediaModal">Upload</Nav.Link>
                  <Nav.Link className={"text-info"} href="#" onClick={profilePageClick}>Profile</Nav.Link>
                  <Nav.Link><LogoutSwitch/></Nav.Link>
                </Nav>

                <HeaderDarkSwitch/>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        :""}
    </div>
)
}
export default PageHeader; 