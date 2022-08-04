import { Modal } from "react-bootstrap";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import MiniUserCard from "./MiniUserCard";

function FollowersModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >

        <Modal.Body style={{height:"60vh",overflowY:"auto"}}>
        <Tabs  fill defaultActiveKey={props.selectedTab} id="uncontrolled-tab-example" className="mb-3 mx-auto w-75 text-center ">
  <Tab eventKey="followers" title="Followers" className="mx-auto w-75">
    {
     props.follower?.map((row,key)=><div key={key} className="border rounded-3 p-2"><MiniUserCard username={row}/></div>) 
    }
  </Tab>
  <Tab eventKey="following" title="Following" className="mx-auto w-75">
  {
     props.following?.map((row,key)=><div key={key} className="border rounded-3 p-2"><MiniUserCard username={row}/></div>) 
  }

  </Tab>
</Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default FollowersModal;