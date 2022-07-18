import { useNavigate } from "react-router-dom";
import { getProfilePic } from "../ApiRequests/ProfileApi";
import UserContext from "../Contexts/UserContext";
import { useContext,useEffect,useState } from "react";
import ThemeContext from "../Contexts/ThemeContext";
function MiniUserCard(props){
    let themeCtx = useContext(ThemeContext);
    let userCtx = useContext(UserContext);
    let [pic,setPic] = useState("");
    const navigate= useNavigate();
    function loadProfilePic(){
    if(props?.source===undefined){
        getProfilePic(props?.username,userCtx)
        .then(res=>setPic(res.data.profilePicAsBase64))
        .catch(err=>console.log(err));
    }
}
useEffect(()=>{
    loadProfilePic();
},[])
    const navToUser= ()=>{
        if(!props.disableProfileLink){
            navigate("/profile/"+props.username);  
        }
    }
    useEffect(()=>{
    },[pic])
    return <div className={"d-flex "+(themeCtx.darkMode?"bg-dark text-light":"")} role="button" onClick={navToUser}>
        <img className="me-2 rounded" src={"data:image/jpg;base64,"+(props.source===undefined?pic:props.source)} style={{height:"35px",width:"50px",objectFit:"contain"}}></img>
        <div>{props.username}</div>
    </div>
}
export default MiniUserCard;