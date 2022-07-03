import UserContext from "../Contexts/UserContext";
import { useContext, useEffect, useRef, useState } from "react";
import {faPenToSquare, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { baseUrl } from "../../ConfigFiles/Urls";
import UploadMediaModal from "../Pages/UploadMediaModal";
import FollowersModal from "./FollowersModal";
import Button from "react-bootstrap/Button";
function UserCard(props){
    const [selectedTab, setSelectedTab] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const bioPlaceHolder = "Add a bio..";
    const userCtx = useContext(UserContext);
    const descriptionRef = useRef();
    const [textAreaClass,setTextAreaClass] = useState("w-75 p-2 me-3 fst-italic");
    const [description,setDescription] = useState(props?.userProfile?.profileDescription?props.userProfile.profileDescription:(props.currentUser?bioPlaceHolder:""));
    const [editable,setEditable] = useState(false);
    // const toggleEdit = ()=> setEditable(!editable);
    const followUser=()=>{
        console.log(props)
        const formData = new FormData();
            formData.set("usernameToFollow",props.userProfile.username);
            axios.post(baseUrl+"/user/follow",formData,
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{console.log(response);props.fetchProfile();}).catch(err=>console.log(err));
    }
    const unfollowUser=()=>{
        // const formData = new FormData();
        //     formData.set("usernameToUnfollow",props.userProfile.username);
            axios.delete(baseUrl+"/user/follow/"+props.userProfile.username,
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{console.log(response);props.fetchProfile();}).catch(err=>console.log(err));
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
            axios.patch(baseUrl+"/user/bio",bio,
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{console.log(response);props.fetchProfile();})
            .catch(err=>{
                console.log(err);
                setDescription(bioPlaceHolder);
            }
                );

        }
    }
    function deleteProfilePic(){
        axios.delete(baseUrl+"/media/profile-pic",
            {
                headers: { 
                    "Authorization":userCtx.getToken(),
                }
            }).then(response=>{console.log(response);props.fetchProfile();}).catch(err=>console.log(err));
    }
    useEffect(()=>{
        toggleTextArea();
    },[editable]);
    function handleDescription(){
        if(description===bioPlaceHolder){
            setDescription("");
        }
    }
    return <div className="d-block w-100 border-top border-bottom" style={{height:"30vh"}}>
        <div className="d-flex w-100 mt-5 p-3">
            <div className="w-25 ms-5 mx-auto">
                <div className="position-relative mx-auto" style={{height:"15vh",width:"15vh"}}>
                <img 
                    className="mx-auto rounded d-block " 
                    src={"data:image/jpg;base64,"+props.userProfile.profilePicAsBase64}
                    alt="Image here" 
                    style={{height:"15vh",width:"15vh",objectFit:"cover"}}
                    
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
             </div>
             <div className="mx-2 w-75">
                <div className="d-flex">
                    <div className="fs-3 w-25">{props.userProfile.username}</div>
                    {props.currentUser?"":
                        props.userProfile.follower.filter(row=>row===userCtx.username).length>0?
                        <button className="btn-primary btn" onClick={unfollowUser}>Unfollow</button>
                        :<button className="btn-primary btn" onClick={followUser}>Follow</button>
                        
                    }
                </div>
            <div className=" d-flex text-center mt-1 fs-5">
                <div className="d-flex" role="button" onClick={() => {setModalShow(true);setSelectedTab("followers")}}>
                        <div>Followers</div>
                        <div className="mx-2" style={{height:"40px"}}>{props.userProfile.follower?.length}</div>
                </div>
                <div className="d-flex mx-4"  role="button" onClick={() =>{setModalShow(true);setSelectedTab("following")}}>
                        <div>Following</div>
                        <div className="mx-2" style={{height:"40px"}}>{props.userProfile.following?.length}</div>
                </div>
                <div className="d-flex mx-4">
                        <div>Posts</div>
                        <div className="mx-2"  style={{height:"40px"}}>{props.mediaCount}</div>
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
    </div>
}
export default UserCard;