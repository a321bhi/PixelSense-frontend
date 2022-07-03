import { baseUrl } from "../../ConfigFiles/Urls";
import axios from "axios";

export const deleteImage = async (mediaId, refreshData, userCtx) => {
    // var bodyFormData = new FormData();
    // bodyFormData.append('mediaId', mediaId);
    await axios.delete( baseUrl+"/media/"+mediaId,
    {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    }).then(response=>{("Deleted successfully");
        alert("Deleted successfully")
        }).catch(err=>(err));
            refreshData();
};
export const unlikeImage = async (mediaId, refreshData, userCtx) => {
    // var bodyFormData = new FormData();
    // bodyFormData.append('mediaId', mediaId);
    await axios.delete(baseUrl+"/media/likes/"+mediaId,
    // bodyFormData,
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
    await axios.post( baseUrl+"/media/likes",
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
    await axios.post( baseUrl+"/media/comment-likes",
    bodyFormData,
    {
       headers: { 
           "Authorization":userCtx.getToken()
         }
     },
      ).then(response=>{refreshData();}).catch(err=>(err));
    };
export const unlikeComment = async (commentId, refreshData, userCtx) => {
    // var bodyFormData = new FormData();
    // bodyFormData.append('commentId', commentId);
    await axios.delete(baseUrl+"/media/comment-likes/"+commentId,
    {
    headers: { 
            "Authorization":userCtx.getToken()
          }
      },
      ).then(response=>{refreshData();}).catch(err=>(err));
};