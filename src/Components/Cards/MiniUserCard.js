import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../ConfigFiles/Urls";
import UserContext from "../Contexts/UserContext";
import { useContext,useEffect,useState } from "react";
function MiniUserCard(props){
    let userCtx = useContext(UserContext);
    let [pic,setPic] = useState("");
    const navigate= useNavigate();
    if(props?.source===undefined){
        axios.get(baseUrl+"/user/"+props?.username,
        {
            headers: { 
              "Authorization":userCtx.token
            }
          }
        ).then(response=>{setPic(response.data.profilePicAsBase64);  }).catch(err=>console.log(err));
    }
    const navToUser= ()=>{
        navigate("/profile/"+props.username);  
    }
    useEffect(()=>{
    },[pic])
    return <div  role="button" className="d-flex" onClick={navToUser}>
        <img className="me-2 rounded" src={"data:image/jpg;base64,"+(props.source===undefined?pic:props.source)} style={{height:"35px",width:"50px",objectFit:"contain"}}></img>
        <div>{props.username}</div>
    </div>
}
export default MiniUserCard;