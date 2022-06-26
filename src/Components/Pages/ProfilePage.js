import CardView from "../Cards/CardView";
import ImageCardModal from "../Cards/ImageCardModal";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import UploadMediaModal from "./UploadMediaModal";
import {baseUrl} from '../../ConfigFiles/Urls';
import axios from "axios";
function ProfilePage(){
    const [modalShow, setModalShow] = useState(false);
    const [currentImage, setcurrentImage] = useState("");
    const [arr, setArr] = useState([]);
    let userCtx = useContext(UserContext);

    function showImageModal(item){
        setcurrentImage(item);
        setModalShow(true);
    }
    const getImages = async () => {
        await axios.get( baseUrl+"/media/getAll",
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{setArr(response.data);}).catch(err=>console.log(err))
      };
      const deleteImage = async (mediaId) => {
        var bodyFormData = new FormData();
        bodyFormData.append('mediaId', mediaId);
        await axios.post( baseUrl+"/media/deleteOneMedia",
        bodyFormData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{console.log("Deleted successfully");}).catch(err=>console.log(err))
      };
      useEffect(()=>{
        getImages();
      },[])
return <div >
<div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto" style={{width:"90%"}}>
    {arr.length?
    arr.map((item,key)=>{
        return <CardView  key={key} source={"data:image/jpg;base64,"+item.imageAsBase64} showImageModal={()=>showImageModal(item)}/>
})
    :"No Data"
}
</div>

<ImageCardModal
              currentUserImage={true} 
              deleteUserImage={()=>deleteImage(currentImage.mediaId)}
              show={modalShow}
              onHide={() => setModalShow(false)}
              source={"data:image/jpg;base64,"+currentImage.imageAsBase64}
/>
<UploadMediaModal/>
</div>
}

export default ProfilePage;