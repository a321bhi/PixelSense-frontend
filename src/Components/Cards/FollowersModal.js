import { Modal } from "react-bootstrap";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import MiniUserCard from "./MiniUserCard";
import { useContext } from "react";
import ThemeContext from "../Contexts/ThemeContext";

function FollowersModal(props) {
  let themeCtx = useContext(ThemeContext);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >

        <Modal.Body className={(themeCtx.darkMode?" bg-dark text-light ":"")} style={{height:"60vh",overflowY:"auto"}}>
        <Tabs  fill defaultActiveKey={props.selectedTab} id="uncontrolled-tab-example" className="mb-3 mx-auto w-75 text-center ">
  <Tab eventKey="followers" title="Followers" className={"mx-auto w-75 "+(themeCtx.darkMode?" bg-dark text-light ":"")}>
    {
     props.follower?.map((row,key)=><div key={key} className="border rounded-3 p-2" onClick={props.onHide}><MiniUserCard username={row}/></div>) 
    }
  </Tab>
  <Tab eventKey="following" title="Following" className="mx-auto w-75">
  {
     props.following?.map((row,key)=><div key={key} className="border rounded-3 p-2" onClick={props.onHide}><MiniUserCard username={row}/></div>) 
  }

  </Tab>
</Tabs>
        </Modal.Body>
        <Modal.Footer className={(themeCtx.darkMode?" bg-dark text-light ":"")}>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default FollowersModal;