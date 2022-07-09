import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import MiniUserCard from "./MiniUserCard";

function LikedByModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      ><Modal.Header className="text-center w-100 fs-4">Liked by</Modal.Header>
        <Modal.Body style={{height:"60vh",overflowY:"auto"}}>
    {
     props.likedBy?.map(row=><div className="border rounded-3 p-2"><MiniUserCard username={row}/></div>) 
    }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default LikedByModal;