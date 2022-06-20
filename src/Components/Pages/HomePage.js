import CardView from "../Cards/CardView";
import UserContext from "../Contexts/UserContext";
import {useState, useContext } from "react";
import ImageCardModal from "../Cards/ImageCardModal";
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
    <div className="row row-cols-1 row-cols-md-3 g-2 w-100">
        
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
    </div>
)
}

export default HomePage;