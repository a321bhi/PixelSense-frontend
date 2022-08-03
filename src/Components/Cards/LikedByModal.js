import { useContext } from "react";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ThemeContext from "../Contexts/ThemeContext";
import MiniUserCard from "./MiniUserCard";

function LikedByModal(props) {
  let themeCtx = useContext(ThemeContext);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ><Modal.Header className={"text-center w-100 fs-4 "+(themeCtx.darkMode?" bg-dark text-light":"")} >Liked by</Modal.Header>
        <Modal.Body className={(themeCtx.darkMode?" bg-dark text-light":"")} style={{height:"60vh",overflowY:"auto"}}>
    {
     props.likedBy?.map(row=><div className="border rounded-3 p-2"><MiniUserCard username={row}/></div>) 
    }
        </Modal.Body>
        <Modal.Footer className={(themeCtx.darkMode?" bg-dark text-light":"")} >
          <Button  onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default LikedByModal;