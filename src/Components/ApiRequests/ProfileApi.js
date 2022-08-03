
import { userServiceUrl } from "../../ConfigFiles/Urls";
import axios from "axios";
export const getProfilePic = async (username, userCtx) =>{
  
    return await axios.get(userServiceUrl+"/user/"+username,
    {
        headers: { 
          "Authorization":userCtx.getToken()
        }
      })
    
}