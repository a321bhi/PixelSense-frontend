import CardAndModal from "../Cards/CardAndModal";
import UserContext from "../Contexts/UserContext";
import {useState, useContext, useEffect,useRef } from "react";
import UploadMediaModal from "./UploadMediaModal";
import axios from "axios";

import { baseUrl } from "../../ConfigFiles/Urls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { Overlay } from "react-bootstrap";
import SelectOrFollowMessage from "../UXMessages/SelectOrFollowMessage";

function HomePage(){
  let userCtx = useContext(UserContext);
  let [feedArr,setFeedArr]=useState([]);
  let [mediaLoaded, setMediaLoaded] =useState(false);
  let[tags,setTags] = useState([]);
  let [dataLoaded,setLoaded]=useState(false);
  let [show,setShow]= useState(false);
  let target = useRef(null)
// (function(){
//   console.log("username is "+userCtx.username);
//   axios.get("http://localhost:8102/media/feed-preference/"+userCtx.username,
//   ).then(response=>{userCtx.setTagsSelected(response.data?.feedPreference)}).catch(err=>console.log(err));
// }());
    const fetchTags= ()=>{
      axios.get("http://localhost:8102/media/feed-preference/"+userCtx.username,)
      .then(response=>{userCtx.setTagsSelected(response.data?.feedPreference)}).catch(err=>console.log(err));
      
      
      axios.get("http://localhost:8102/media/tags")
      .then(response=>{response.data = [...new Set(response.data)];setTags(response.data);setLoaded(true)}).catch(err=>console.log(err));
      
    }
    const fetchFeed = ()=>{ 
      
      let chosenTags=[...new Set(userCtx.tagsSelected)];
      
      const user={
        username:userCtx.username,
        feedPreference : userCtx.tagsSelected
      }
      axios.post("http://localhost:8102/media/feed-preference",
      user,
      {
        headers:{
          "Authorization":userCtx.getToken()
        }
      })
      .then(res=>console.log("feed preference updated"))
      .catch(err=>console.log(err));
      if(chosenTags.length==0){
        return;
      }
      let totalChars=40;
      let queryTags= chosenTags.map(tag=>{
        totalChars+=tag.length+1;
        if(totalChars<1900){
          return tag;
        }
      })        
        axios.get("http://localhost:8102/media/feed/"+queryTags.toString())
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
                setFeedArr(response.data);
              setMediaLoaded(true);
            }).catch(err=>console.log(err));
        }
    // const baseUrl = './sampleImages/img';
    // let arr = [...Array(9).keys()];
    useEffect(()=>{
        fetchFeed();fetchTags();
    },[mediaLoaded])
return (<div>
  <div> <Button ref={target} onClick={() => {setShow(!show); fetchFeed();}}  >
    <FontAwesomeIcon icon={faAsterisk}></FontAwesomeIcon>
    </Button>
    <Overlay target={target.current} show={show} placement="right">
    {<div className="container"
     style={{
      position:"absolute",
       backgroundColor: 'rgba(0, 0, 0, 0.85)',
       padding: '2px 10px',
       maxWidth:'50vw',
       marginTop:'10vh',
       color: 'white',
       borderRadius: 3,
       overflowY:"auto",
       overflowX:"hidden",
       maxHeight:"50vh"
     }}>
      <div className="row row-cols-3 ms-2">
       {tags?.map(item=>{
          return <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id={"check"+item }
                      defaultChecked={userCtx.tagsSelected.includes(item)?true:false}
                      onChange={()=>{
                        if(userCtx.tagsSelected.includes(item)){
                          userCtx.setTagsSelected(userCtx.tagsSelected.filter(i=>i!==item))
                          }else{
                            userCtx.setTagsSelected([...userCtx.tagsSelected,item])
                          }
                        }
                      }/>
                <label class="form-check-label ms-2" for={"check"+item}>{item}</label>
              </div>
          }
        )
      }
      </div>
      </div>
      
    }
  
    </Overlay> </div>
    <div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto mt-2" 
        style={{width:"90%"}}
 >
          {!mediaLoaded||feedArr.length===0?<SelectOrFollowMessage/>:
    feedArr.map((item,key)=>{
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

export default HomePage;