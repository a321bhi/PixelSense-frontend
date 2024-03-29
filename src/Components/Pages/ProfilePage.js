import { useState, useContext, useEffect } from "react";
import UserContext from "../Contexts/UserContext";
import UploadMediaModal from "./UploadMediaModal";
import { mediaServiceUrl, userServiceUrl} from '../../ConfigFiles/Urls';
import axios from "axios";
import NoProfileMedia from "../UXMessages/NoProfileMedia";
import CardAndModal from "../Cards/CardAndModal";
import UserCard from "../Cards/UserCard";
import { useParams } from "react-router-dom";
import NoMedia from "../UXMessages/NoMedia";
import ThemeContext from "../Contexts/ThemeContext";
function ProfilePage(){

  let { id } = useParams();
  let userCtx = useContext(UserContext);
  let themeCtx = useContext(ThemeContext);
  const [profileLoaded,setProfileLoaded] = useState(false);
  const [mediaLoaded,setMediaLoaded] = useState(false);

  function determineCurrentUser(){

     let decisionRequired = id===undefined?false:true;
     if(decisionRequired){
        if(id===userCtx.getUsername()){
          return true;
        }else{
          return false;
        }
     }else{
        return true;
     }
  }
  let currentUser = determineCurrentUser();
  
    const [userProfile, setUserProfile] = useState({});
    const [arr, setArr] = useState([]);
   

    const getImages = async () => {

      let queryUsername = determineCurrentUser()?userCtx.getUsername():id;
       await axios.get(userServiceUrl+"/user/all-media/"+queryUsername,
        {
            headers: { 
              "Authorization":userCtx.getToken()
            }
        },
        ).then(
          response=>{
            response.data.map(media=>{

              // media.mediaComments?.forEach(row=>{row.commentLikedBy = row.commentLikedBy.map(innerRow=>innerRow.username)});
              media.mediaComments.sort((row1,row2)=>{
                var date1 = new Date(row1.createdAt);
                var date2 = new Date(row2.createdAt);
                return date1.getTime()-date2.getTime();
              });
              
              media.mediaComments.forEach(row=>{
                if(row.commentsOnComment?.length>0){                
                    row.commentsOnComment?.sort((row1,row2)=>{
                      var date1 = new Date(row1.createdAt);
                      var date2 = new Date(row2.createdAt);
                      return date1.getTime()-date2.getTime();
                    })
                  // return row.commentsOnComment.forEach(row=>{row.commentLikedBy = row.commentLikedBy.map(innerRow=>innerRow.username)})
                }
              })
              

              return media;
            })
            response.data.sort((row1,row2)=>{
              var date1 = new Date(row1.createdAt);
              var date2 = new Date(row2.createdAt);
              return date2.getTime()-date1.getTime();
            });
            
            setArr(response.data);
          setMediaLoaded(true);
        }).catch(err=>console.log(err))
      };
      const updateOneImage = async (mediaId) =>{
        let updatedImage;
        await axios.get(mediaServiceUrl+"/service/media-for-update/"+mediaId,
        {
          headers: { 
            "Authorization":userCtx.getToken()
          }
      },
        ).then(res => updatedImage=res.data).catch(err=>console.log(err));
        // updatedImage.mediaComments?.forEach(row=>{row.commentLikedBy = row.commentLikedBy?.map(innerRow=>innerRow.username)});
    
        updatedImage.mediaComments?.sort((row1,row2)=>{
          var date1 = new Date(row1.createdAt);
          var date2 = new Date(row2.createdAt);
          return date1.getTime()-date2.getTime();
        });
        updatedImage.mediaComments.forEach(row=>{
          if(row.commentsOnComment?.length>0){
            row.commentsOnComment?.sort((row1,row2)=>{
              var date1 = new Date(row1.createdAt);
              var date2 = new Date(row2.createdAt);
              return date1.getTime()-date2.getTime();
            })
            // return row.commentsOnComment.forEach(row=>{row.commentLikedBy = row.commentLikedBy.map(innerRow=>innerRow.username)})
          }
        })
        setArr(arr.map(row=>{
          if(row.mediaId===mediaId){
            return updatedImage;
          }else{
            return row;
          }
        } ))
      }
      const fetchProfile = async ()=>{
        
       await axios.get(userServiceUrl+"/user/"+(currentUser?userCtx.getUsername():id),
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
        fetchProfile();
        getImages();
      },[id])
      useEffect(()=>{
      },[profileLoaded])

return <div className={(themeCtx.darkMode?" bg-dark text-light":"")} style={{width:"100%",minHeight:"100vh"}} >
  <div className="mx-auto " style={{width:"90%"}}>
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
                  updateOneImage={updateOneImage}
                  mediaPostedBy={id}
                />)})
    :currentUser?<NoProfileMedia/>:<NoMedia/>}
</div>
<UploadMediaModal updateFunction={getImages}/>

</div>
</div>
}

export default ProfilePage;