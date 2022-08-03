import CardAndModal from "../Cards/CardAndModal";
import {useState, useEffect, } from "react";
import UploadMediaModal from "./UploadMediaModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { useContext } from "react";
import {  mediaServiceUrl } from "../../ConfigFiles/Urls";
function SelectedTagPage(){
  const userCtx = useContext(UserContext);
    let { tag } = useParams();
  let [searchResult,setSearchResult]=useState([]);

    const fetchFeed = async ()=>{ 
      
      let chosenTag=tag;
      
    
      if(chosenTag.length==0){
        return;
      }
         
       await axios.get(mediaServiceUrl+"/service/feed/"+chosenTag,
       {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    },)
        .then(response=>{
                response.data.map(media=>{
                  media.mediaComments?.map(row=>{
                    var date = new Date(row.createdAt);
                    row.createdAt = date.toTimeString().substring(0,9)+date.toDateString().substring(4);
                    return row;
                  })
                  media.mediaComments?.forEach(row=>{row.commentLikedBy = row.commentLikedBy?.map(innerRow=>innerRow.userName)});
           
                  media.mediaComments?.sort((row1,row2)=>{
                    var date1 = new Date(row1.createdAt);
                    var date2 = new Date(row2.createdAt);
                    return date1.getTime()-date2.getTime();
                  });
                  return media;
                })
                response.data.sort((row1,row2)=>{
                  var date1 = new Date(row1.mediaDate);
                  var date2 = new Date(row2.mediaDate);
                  return date2.getTime()-date1.getTime();
                });
                setSearchResult(response.data);
            }).catch(err=>console.log(err));
        }
   

    useEffect(()=>{
        fetchFeed();
    },[])
 
return (<div>
    <div className="fs-2 text-center mt-5">Displaying search result for - <span className="text-primary">#{tag}</span></div>
    <div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto mt-2" 
        style={{width:"90%"}}
 >
 
          {searchResult?.length<1?"Loading...":
    searchResult.map((item,key)=>{
        return (<CardAndModal
                  num={key}
                  key={key} 
                  imageData={item}
                  refreshData={fetchFeed}
              />
              )
        })
   }
    
    </div>
    <UploadMediaModal/>
    </div>
)
}

export default SelectedTagPage;