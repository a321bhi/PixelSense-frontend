import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import UploadMediaModal from "./UploadMediaModal";
import {baseUrl} from '../../ConfigFiles/Urls';
import axios from "axios";
import NoProfileMedia from "../UXMessages/NoProfileMedia";
import CardAndModal from "../Cards/CardAndModal";
import UserCard from "../Cards/UserCard";
import { useParams } from "react-router-dom";
import NoMedia from "../UXMessages/NoMedia";
function ProfilePage(){

  let { id } = useParams();
  let userCtx = useContext(UserContext);
  const [profileLoaded,setProfileLoaded] = useState(false);
  const [mediaLoaded,setMediaLoaded] = useState(false);

  function determineCurrentUser(){
     let decision = id?true:false;
     if(decision){
        if(id===userCtx.username){
          return true;
        }else{
          return false;
        }
     }else{
        return true;
     }
  }
  const [currentUser,setCurrentUser] = useState(determineCurrentUser())
    const [userProfile, setUserProfile] = useState({});
    const [arr, setArr] = useState([]);
   
    const getImages = async () => {
      let formData = new FormData();
      formData.append("username",currentUser?userCtx.username:id);
    
       await axios.post(baseUrl+"/media/getAll",formData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(
          response=>{
          
            response.data.map(media=>{
              media.mediaComments.map(row=>{
                var date = new Date(row.createdAt);
                row.createdAt = date.toTimeString().substring(0,9)+date.toDateString().substring(4);
                return row;
              })
              media.mediaComments.sort((row1,row2)=>{
                var date1 = new Date(row1.createdAt);
                var date2 = new Date(row2.createdAt);
                return date1.getTime()-date2.getTime();
              });
              return media;
            })
            setArr(response.data);
          setMediaLoaded(true);
        }).catch(err=>console.log(err))
      };
      
      const fetchProfile = ()=>{
        axios.get(baseUrl+"/user/getUser/"+(currentUser?userCtx.username:id),
            {
              headers: { 
                "Authorization":userCtx.token
              }
            },).then(response=>{
              setUserProfile(response.data);
              setProfileLoaded(true);
              userCtx.setUserProfile(response.data);
            })
            .catch(err=>console.log(err));
      }
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
        ).then(response=>{("Deleted successfully");
        alert("Deleted successfully")
      }).catch(err=>(err));
      getImages();
      };
      const unlikeImage = async (mediaId) => {
        var bodyFormData = new FormData();
        bodyFormData.append('mediaId', mediaId);
        await axios.post(baseUrl+"/media/unlikeMedia",
        bodyFormData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{getImages();}).catch(err=>(err));
      };
      const likeImage = async (mediaId) => {
        var bodyFormData = new FormData();
        bodyFormData.append('mediaId', mediaId);
        await axios.post( baseUrl+"/media/likeMedia",
        bodyFormData,
        {
            headers: { 
              "Authorization":userCtx.token
            }
        },
        ).then(response=>{getImages();}).catch(err=>(err));
      };
      useEffect(()=>{
        fetchProfile();
        getImages();
      },[]);
      useEffect(()=>{
      },[profileLoaded])
      // useEffect(()=>{
      //     fetchProfile();
      //     getImages();
      //   },[]);
return <div className="mx-auto" style={{width:"85%"}}>
{profileLoaded&&
  <UserCard  
    mediaCount={arr.length} 
    fetchProfile={fetchProfile}
    currentUser={currentUser}
    userProfile={userProfile}
    />
    }
<div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto" style={{width:"90%"}}>
    {(mediaLoaded&&arr.length>0)?
    arr.map((item,key)=>{
        return (<CardAndModal 
                  currentUser={currentUser} 
                  num={key}
                  key={key} 
                  imageData={item}
                  profilePage={true}
                  deleteImage={deleteImage}
                  likeImage={likeImage} 
                  unlikeImage={unlikeImage}
                  fetchProfile={getImages}
                />)})
    :currentUser?<NoProfileMedia/>:<NoMedia/>}
</div>
<UploadMediaModal updateFunction={getImages}/>

</div>
}

export default ProfilePage;