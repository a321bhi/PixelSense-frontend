import CardView from "../Cards/CardView";
import UserContext from "../Contexts/UserContext";
import {useState, useContext } from "react";
import ImageCardModal from "../Cards/ImageCardModal";
import UploadMediaModal from "./UploadMediaModal";
function HomePage(){
    const [modalShow, setModalShow] = useState(false);
    const [currentImage, setcurrentImage] = useState("");
    let userCtx = useContext(UserContext);
    const baseUrl = './sampleImages/img';
    let arr = [...Array(9).keys()];
    function showImageModal(key){
        setcurrentImage(key);
        setModalShow(true);
    }
return (<div >
    logged in as {userCtx.username}
    <div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto" style={{width:"90%"}}>
        
        {arr.length?
        arr.map(item=>{
            return <CardView  key={item} source={require(baseUrl+(item+1)+'.jpg')} showImageModal={showImageModal}/>
})
        :"No Data"
    }
    </div>
    <ImageCardModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  source={currentImage}
    />
    <UploadMediaModal/>
    </div>
)
}

export default HomePage;