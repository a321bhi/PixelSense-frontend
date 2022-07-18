import { baseUrl } from "../../ConfigFiles/Urls";
import axios from "axios";

import { toast } from 'react-toastify';
export const deleteImage = async (mediaId, refreshData, userCtx) => {
    await axios.delete( baseUrl+"/user/media/"+mediaId,
    {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    }).then(response=>{("Deleted successfully");
    toast.info("Deleted successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss:false
      });
    
        }).catch(err=>(err));
            refreshData();
};
export const unlikeImage = async (mediaId, refreshData, userCtx) => {

    await axios.delete(baseUrl+"/user/media-likes/"+mediaId,
    {
    headers: { 
            "Authorization":userCtx.getToken()
          }
      },
      ).then(response=>{refreshData();}).catch(err=>(err));
      };
export const likeImage = async (mediaId, refreshData, userCtx) => {
    var bodyFormData = new FormData();
    bodyFormData.append('mediaId', mediaId);
    await axios.post( baseUrl+"/user/media-likes",
    bodyFormData,
    {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    },
     ).then(response=>{refreshData();}).catch(err=>(err));
     };
export const likeComment = async (commentId, refreshData, userCtx) => {
    var bodyFormData = new FormData();
    bodyFormData.append('commentId', commentId);
    await axios.post( baseUrl+"/user/comment-likes",
    bodyFormData,
    {
       headers: { 
           "Authorization":userCtx.getToken()
         }
     },
      ).then(response=>{refreshData();}).catch(err=>(err));
    };
export const unlikeComment = async (commentId, refreshData, userCtx) => {

    await axios.delete(baseUrl+"/user/comment-likes/"+commentId,
    {
    headers: { 
            "Authorization":userCtx.getToken()
          }
      },
      ).then(response=>{refreshData();}).catch(err=>(err));
};