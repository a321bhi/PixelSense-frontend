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

    function showImageModal(key){
        setcurrentImage(key);
        setModalShow(true);
    }
    const getImages = async () => {
        await axios.get( "http://localhost:8090/media/getAll",
        {
            headers: { 
              "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmhpaml0IiwiYXV0aG9yaXRpZXMiOiJVU0VSIiwiZXhwIjoxNjU3MjE4NjAwfQ.Wv7CiSCystNbEMIGq8j93_ADGKqhtT5AZQB83lbHMUk',
              
            }
        },
        ).then(response=>{setArr(response.data.map(item=>item.imageAsBase64));}).catch(err=>console.log(err))
      };
      useEffect(()=>{
        getImages();
      },[])
return <div >
<div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto" style={{width:"90%"}}>
    {}
    {arr.length?
    arr.map(item=>{
        return <CardView  key={item} source={"data:image/jpg;base64,"+item} showImageModal={showImageModal}/>
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
}

export default ProfilePage;