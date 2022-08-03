import UserContext from "../Contexts/UserContext";
import { useContext, useEffect, useRef, useState } from "react";
import {faPenToSquare,faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { storyServiceUrl, userServiceUrl } from "../../ConfigFiles/Urls";
import UploadMediaModal from "../Pages/UploadMediaModal";
import FollowersModal from "./FollowersModal";
import StoryCarousel from "./StoryCarousel";
import ProfileUpdationForm from "../Forms/ProfileUpdationForm";
function UserCard(props){
    let [showStories,setShowStories] = useState(false);
    let [showArchivedStories,setShowArchivedStories] = useState(false);
    let [storyBorder,setStoryBorder] = useState({height:"17vh",width:"18vh"})
    const [userStories, setUserStories] = useState([]);
    const [archivedStories, setArchivedStories] = useState([]);
    const [selectedTab, setSelectedTab] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const bioPlaceHolder = "Add a bio..";
    const userCtx = useContext(UserContext);
    const descriptionRef = useRef();
    const [textAreaClass,setTextAreaClass] = useState("w-75 p-2 me-3 fst-italic");
    const [description,setDescription] = useState(props?.userProfile?.profileDescription?props.userProfile.profileDescription:(props.currentUser?bioPlaceHolder:""));
    const [editable,setEditable] = useState(false);
    const fetchStories = ()=>{
        axios.get(storyServiceUrl+"/story/stories/"+(props.currentUser?userCtx.getUsername():props.userProfile.username),
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{if(response?.data?.length>0){
                setUserStories(response.data);
                setStoryBorder({height:"17vh",width:"18vh",
                border:" 3px solid",
                borderRadius:"30px",
                borderImage:"url('./borderImage.jpg') 10 round",
                 })
                 
                }else{
                    setStoryBorder({height:"17vh",width:"18vh",})

                }
            }).catch(err=>console.log(err));
    }
    const fetchArchivedStories = ()=>{
        axios.get(storyServiceUrl+"/story/archived-stories/"+userCtx.getUsername(),
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{setArchivedStories(response.data)}).catch(err=>console.log(err));
    }
    const followUser=()=>{
    
        const formData = new FormData();
            formData.set("usernameToFollow",props.userProfile.username);
            axios.post(userServiceUrl+"/user/follow",formData,
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{props.fetchProfile();}).catch(err=>console.log(err));
    }
    const unfollowUser=()=>{
            axios.delete(userServiceUrl+"/user/follow/"+props.userProfile.username,
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{props.fetchProfile();}).catch(err=>console.log(err));
    }
    const toggleTextArea=()=>{
        if(editable){
            setTextAreaClass("w-75 p-2 me-3 fst-italic border ");
        }else{
            setTextAreaClass("w-75 p-2 me-3 fst-italic");
        }
    }
    function updateDescription(){
        setEditable(false);
        if(description!==bioPlaceHolder){
            const bio = { bio:descriptionRef.current.innerHTML}
            axios.patch(userServiceUrl+"/user/bio",bio,
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{props.fetchProfile();})
            .catch(err=>{
                console.log(err);
                setDescription(bioPlaceHolder);
            }
                );

        }
    }
    function deleteProfilePic(){
        axios.delete(userServiceUrl+"/user/profile-pic",
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{props.fetchProfile();}).catch(err=>console.log(err));
    }
    useEffect(()=>{
        toggleTextArea();
        
    },[editable]);
    useEffect(()=>{
        fetchStories();
        fetchArchivedStories();
    },[])
    function handleDescription(){
        if(description===bioPlaceHolder){
            setDescription("");
        }
    }
    return <div className="w-100 border-top border-bottom" style={{maxHeight:"50vh"}}>
        <div className="d-md-flex d-block w-100 mt-2 p-3">
            <div className="mx-auto d-flex w-25 w-xs-100">
                <div className="position-relative mx-auto p-2" style={storyBorder}>
                <img role="button"
                    className="mx-auto d-block " 
                    src={"data:image/jpg;base64,"+props.userProfile.profilePicAsBase64}
                    alt="Image here" 
                    onClick={()=>{if(userStories.length>0){setShowStories(true)}}}
                    style={{height:"15vh",width:"16vh",objectFit:"cover"}}
                    
                />{props.currentUser?
            <div className="btn-group position-absolute top-0 start-100">
                <div type="button" id="editImage" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                </div>
                <ul className="dropdown-menu text-center" aria-labelledby="editImage">
                  <li><div 
                  role="button"
                  className="dropdown-item"  
                        data-bs-toggle="modal" data-bs-target="#uploadMediaModalProfilePic" 
                        >Update Image
                      </div>
                  </li>   
                  <li>
                    <div
                    role="button"
                    className="dropdown-item" 
                        onClick={deleteProfilePic}
                        >Delete Image
                      </div>
                  </li>           
                </ul>
              </div>
            :""
            }
                </div>
                
             {props.currentUser?
          <div className="w-25 d-block d-md-none text-end" >
                <div type="button" style={{width:"30px"}} id="editProfile" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                </div>
                <ul className="dropdown-menu" aria-labelledby="editProfile">
                <li><div 
                  role="button"
                  className="dropdown-item"  
                  data-bs-toggle="modal" data-bs-target="#profileUpdateModal"
                        >Update profile
                      </div>
                  </li> 
                  <li><div 
                  role="button"
                  className="dropdown-item"  
                        onClick={()=>setShowArchivedStories(true)} 
                        >View archived stories
                      </div>
                  </li>            
                </ul>
              </div>
              :""
          }
             </div>
             <div className="mx-2 w-50">
                <div className="d-flex">
                    <div className="fs-3 w-25">{props.userProfile.username}</div>
                    {props.currentUser?"":
                        props.userProfile.follower.filter(row=>row===userCtx.username).length>0?
                        <button className="btn-primary btn" onClick={unfollowUser}>Unfollow</button>
                        :<button className="btn-primary btn" onClick={followUser}>Follow</button>
                        
                    }
                </div>
            <div className=" d-flex text-center my-3 fs-5 w-100">
                <div className="d-block w-md-100" role="button" onClick={() => {setModalShow(true);setSelectedTab("followers")}}>
                        <div className="text-center" style={{height:"30px"}}>{props.userProfile.follower?.length}</div>
                        <div>Followers</div>
                </div>
                <div className="d-block ms-5  w-md-100"  role="button" onClick={() =>{setModalShow(true);setSelectedTab("following")}}>
                        <div className="text-center" style={{height:"30px"}}>{props.userProfile.following?.length}</div>
                        <div>Following</div>
                </div>
                <div className="d-block ms-5  w-md-100">
                        <div className="text-center"  style={{height:"30px"}}>{props.mediaCount}</div>
                        <div>Posts</div>
                </div>
            </div>
            <div className="fs-5">{props.userProfile.fullName}</div>
            <div className="input-group my-2 w-100">
            {props.currentUser?<FontAwesomeIcon  role="button" onClick={editable?updateDescription:()=>setEditable(true)} icon={faPenToSquare}></FontAwesomeIcon>:""}
                <div 
                ref={descriptionRef}
                className={textAreaClass}
                type="text" 
                onFocus={handleDescription}
                contentEditable={editable} 
                style={{height:"75px"}}>
                    {description}
                </div>
            </div>  
            </div>
             {/* User Edit part */}



             {props.currentUser?
          <div className="w-25 d-none d-md-block" >
                <div type="button" style={{width:"30px"}} id="editProfile" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
                </div>
                <ul className="dropdown-menu" aria-labelledby="editProfile">
                <li><div 
                  role="button"
                  className="dropdown-item"  
                  data-bs-toggle="modal" data-bs-target="#profileUpdateModal"
                        >Update profile
                      </div>
                  </li> 
                  <li><div 
                  role="button"
                  className="dropdown-item"  
                        onClick={()=>setShowArchivedStories(true)} 
                        >View archived stories
                      </div>
                  </li>            
                </ul>
              </div>
              :""
          }





{/* ends */}
        </div>
        <UploadMediaModal profilePic={true} multiModal={"uploadMediaModalProfilePic"}
         updateFunction={props.fetchProfile}/>
        <FollowersModal
        selectedTab={selectedTab}
        follower={props.userProfile.follower}
        following={props.userProfile.following}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <StoryCarousel  
            header={"User stories"}
            show={showStories}
            onHide={() => setShowStories(false)}
            images={userStories}
        />
         <StoryCarousel  
         header={"Archived stories"}
            show={showArchivedStories}
            onHide={() => setShowArchivedStories(false)}
            images={archivedStories}
        />
            
    <ProfileUpdationForm/>
    </div>
}
export default UserCard;