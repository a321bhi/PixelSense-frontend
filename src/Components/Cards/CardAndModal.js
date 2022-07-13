import CardView from "./CardView";
import { useRef,useState } from "react";
import ImageModal from "./ImageModal";
function CardAndModal(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const modalCloseButtonHandle = useRef();
    
    return <div className="col g-3">
        <CardView {...props} handleShow={handleShow} />
        <ImageModal closeRef={modalCloseButtonHandle}
                usernamePostedBy={props.usernamePostedBy?props.usernamePostedBy:props.imageData.usernamePostedBy}
                refreshData={props.refreshData}
                local={props.local?props.local:false}
                currentUser={props.currentUser}
            //   deleteUserImage={props.deleteImage?props.deleteImage:()=>{}}
              imageData={props.imageData}           
              handleClose={handleClose}
              showModal={show}
              updateOneImage={props.updateOneImage}
              />
    </div>

}
export default CardAndModal;