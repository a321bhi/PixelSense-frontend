import CardView from "../Cards/CardView";
import ImageCardModal from "../Cards/ImageCardModal";
import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import UploadMediaModal from "./UploadMediaModal";
import {baseUrl} from '../../ConfigFiles/Urls';
import { useRef } from "react";
import axios from "axios";
import NoProfileMedia from "../UXMessages/NoProfileMedia";
function ProfilePage(){
    const [modalShow, setModalShow] = useState(false);
    const [currentImage, setcurrentImage] = useState("");
    const [arr, setArr] = useState([]);
    const modalCloseButtonHandle = useRef();
    let userCtx = useContext(UserContext);
useEffect(()=>{
  if(modalShow){
    const currentMediaId = currentImage.mediaId;
    const updatedData = arr.filter(item=>item.mediaId===currentMediaId)[0];
   setcurrentImage(updatedData);
  }
},[arr]);
    function showImageModal(item){
        setcurrentImage(item);
        setModalShow(true);
    }
    let getImages = async () => {
        await axios.get( baseUrl+"/media/getAll",
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{setArr(response.data);}).catch(err=>console.log(err))
      };
      let deleteImage = async (mediaId) => {
        var bodyFormData = new FormData();
        bodyFormData.append('mediaId', mediaId);
        await axios.post( baseUrl+"/media/deleteOneMedia",
        bodyFormData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{console.log("Deleted successfully");
        modalCloseButtonHandle.current.click();
        alert("Deleted successfully")
      }).catch(err=>console.log(err));
      getImages();
      };
      let unlikeImage = async (mediaId) => {
        var bodyFormData = new FormData();
        bodyFormData.append('mediaId', mediaId);
        await axios.post(baseUrl+"/media/unlikeMedia",
        bodyFormData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{getImages();}).catch(err=>console.log(err));
      };
      let likeImage = async (mediaId) => {
        var bodyFormData = new FormData();
        bodyFormData.append('mediaId', mediaId);
        await axios.post( baseUrl+"/media/likeMedia",
        bodyFormData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{getImages();}).catch(err=>console.log(err));
      };
      useEffect(()=>{
        getImages();
      },[])
return <div className="w-100">
<div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto" style={{width:"90%"}}>
    {arr.length?
    arr.map((item,key)=>{
        return (<CardView 
              currentUserImage={true} key={key} 
              imageData={item} 
              showImageModal={()=>showImageModal(item)}
              likeImage={likeImage}
              unlikeImage={unlikeImage}
              />)
})
    :<NoProfileMedia/>
}
</div>
{modalShow?<ImageCardModal
      closeRef={modalCloseButtonHandle}
              currentUserImage={true} 
              deleteUserImage={deleteImage}
              show={modalShow}
              onHide={() => setModalShow(false)}
              imageData={currentImage}
              likeImage={likeImage}
              unlikeImage={unlikeImage}/>:""}
<UploadMediaModal/>
</div>
}

export default ProfilePage;