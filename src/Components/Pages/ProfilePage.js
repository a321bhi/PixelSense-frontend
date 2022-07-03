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
      let queryUsername = currentUser?userCtx.username:id;
    
       await axios.get(baseUrl+"/media/all/"+queryUsername,
        {
            headers: { 
              "Authorization":userCtx.getToken()
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
              media.mediaComments?.forEach(row=>{row.commentLikedBy = row.commentLikedBy.map(innerRow=>innerRow.userName)});
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
      
      const fetchProfile = async ()=>{
        
       await axios.get(baseUrl+"/user/"+(currentUser?userCtx.username:id),
            {
              headers: { 
                "Authorization":userCtx.getToken()
              }
            },).then(response=>{
              setUserProfile(response.data);
              setProfileLoaded(true);
              userCtx.setUserProfile(response.data);
            })
            .catch(err=>console.log(err));
      }
      
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
                  refreshData={getImages}
                />)})
    :currentUser?<NoProfileMedia/>:<NoMedia/>}
</div>
<UploadMediaModal updateFunction={getImages}/>

</div>
}

export default ProfilePage;