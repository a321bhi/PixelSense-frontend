import HeaderDarkSwitch from "./HeaderDarkSwitch";
import LogoutSwitch from "./LogoutSwitch";
import { Navbar,Container,Offcanvas,Nav,Form,Button } from "react-bootstrap";
import MiniUserCard from '../Cards/MiniUserCard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { faIdCard} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
function NavbarComponent(){
  const [searchResult, setSearchResult] = useState({});
  const searchBarHandle = useRef();
    const navigate = useNavigate();
function messageIconClick(){
    navigate('/chats');   
}
function profilePageClick(){
    navigate('/profile',);
}
function search(){
  console.log(searchBarHandle?.current?.value)
  if(searchBarHandle?.current?.value!==""){
  axios.get("http://localhost:8102/media/search/"+searchBarHandle.current.value)
  .then(response =>{ setSearchResult(response.data);console.log(response.data)}).catch(err=>console.log(err));
  }else{
    setSearchResult({});
  }
}
useEffect(()=>{

},[searchResult,searchBarHandle?.current?.value])
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
        <div className="d-flex w-100 justify-content-center">
            <input
              type="search"
              placeholder="Search"
              className="me-2 w-50 dropdown-toggle form-control "
              aria-label="Search"
              ref={searchBarHandle}
              onChange={search}
              id="dropdownMenuClickableInside" 
              data-bs-toggle="dropdown" 
              data-bs-auto-close="outside " aria-expanded="false"
            ></input>
            <ul className="dropdown-menu" style={{left:"21%",width:"25vw",maxHeight:"45vh",overflowY:"auto"}}  aria-labelledby="dropdownMenuClickableInside">
            <li className="text-center fw-bold dropdown-item">Tags</li>
            {searchResult?.mediaTagsOutput?.length>0 && searchBarHandle?.current?.value!==""?
                  searchResult?.mediaTagsOutput?.map(output=> <li><a class="dropdown-item text-primary" href="#">#{output}</a></li>)
                  :<li  className="text-center">No tags found</li>
            }
            <div className="border"></div>
            <li className="text-center fw-bold dropdown-item">Users</li>
            {searchResult?.usernameOutput?.length>0 && searchBarHandle?.csurrent?.value!==""?
                  searchResult?.usernameOutput?.map(output=> <li><a role="button" class="dropdown-item"><MiniUserCard username={output}/></a></li>)
                  :<li className="text-center">No users found</li>
                  
            }
            </ul>
          </div>
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