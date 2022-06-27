import CardView from "../Cards/CardView";
import UserContext from "../Contexts/UserContext";
import {useState, useContext } from "react";
import ImageCardModal from "../Cards/ImageCardModal";
import UploadMediaModal from "./UploadMediaModal";
import axios from "axios";
function HomePage(){
    const [modalShow, setModalShow] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    let userCtx = useContext(UserContext);
    const baseUrl = './sampleImages/img';
    let arr = [...Array(9).keys()];
    function showImageModal(key){
        setCurrentImage(key);
        setModalShow(true);
    }

return (<div >
    logged in as {userCtx.username}
    <div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto" style={{width:"90%"}}>
        
        {arr.length?
        arr.map(item=>{
            const imageData={imageAsBase64:require(baseUrl+(item+1)+'.jpg')}
            return <CardView  key={item} local={true} imageData={imageData} showImageModal={()=>showImageModal(imageData)}/>
})
        :"No Data"
    }
    </div>
    <ImageCardModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  imageData={currentImage}
                  local={true}
    />
    <UploadMediaModal/>
    </div>
)
}

export default HomePage;