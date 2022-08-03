import CardAndModal from "../Cards/CardAndModal";
import UserContext from "../Contexts/UserContext";
import {useState, useContext, useEffect,useRef } from "react";
import UploadMediaModal from "./UploadMediaModal";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import { Overlay } from "react-bootstrap";
import SelectOrFollowMessage from "../UXMessages/SelectOrFollowMessage";
import { mediaServiceUrl } from "../../ConfigFiles/Urls";
import ThemeContext from "../Contexts/ThemeContext";

function HomePage(){
  let themeCtx = useContext(ThemeContext);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage,setCurrentPage] = useState(0);
  let [hasMoreData,setHasMoreData] = useState(true);
  let userCtx = useContext(UserContext);
  let [feedArr,setFeedArr]=useState([]);
  let[tags,setTags] = useState([]);
  let [show,setShow]= useState(false);
  let target = useRef(null)
  let [feedPrefUpdated, setFeedPrefUpdated] =  useState(false);
  const updateOneImage = async (mediaId) =>{
    let updatedImage;
    await axios.get(mediaServiceUrl+"/service/media-for-update/"+mediaId,
    {
      headers: { 
        "Authorization":userCtx.getToken()
      }
  },).then(res => updatedImage=res.data).catch(err=>console.log(err));
    updatedImage.mediaComments?.forEach(row=>{row.commentLikedBy = row.commentLikedBy?.map(innerRow=>innerRow.userName)});

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
        return row.commentsOnComment.forEach(row=>{row.commentLikedBy = row.commentLikedBy.map(innerRow=>innerRow.userName)})
      }
    })
    setFeedArr(feedArr.map(row=>{
      if(row.mediaId===mediaId){
        return updatedImage;
      }else{
        return row;
      }
    } ))
  }
    const fetchTags = ()=>{
      axios.get(mediaServiceUrl+"/service/feed-preference/"+userCtx.getUsername(),
      {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    },)
      .then(response=>{setSelectedTags(response.data?.feedPreference);}).catch(err=>console.log(err));
      
      
       axios.get(mediaServiceUrl+"/service/tags",
       {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    },)
      .then(response=>{response.data = [...new Set(response.data)];setTags(response.data);}).catch(err=>console.log(err));
    };
  
    const fetchFeed = async ()=>{ 
      
      let chosenTags=[...new Set(selectedTags)];
    
      if(chosenTags.length==0){
        return;
      }
      let totalChars=40;
      let queryTags= chosenTags.map(tag=>{
        totalChars+=tag.length+1;
        if(totalChars<1800){
          return tag;
        }
      })

      if(feedPrefUpdated){
        setCurrentPage(0);
      }
       await axios.get(mediaServiceUrl+"/service/feed-paginated/"+"?page="+(feedPrefUpdated?0:currentPage)+"&size=6&sortDir=desc&sort=mediaDate&tags="+queryTags.toString(),
       {
        headers: { 
          "Authorization":userCtx.getToken()
        }
        },
       )
        .then(response=>{
          if(response.data?.length===0){
            setHasMoreData(false);
          }
                response.data.map(media=>{
            
                  media.mediaComments?.forEach(row=>{row.commentLikedBy = row.commentLikedBy?.map(innerRow=>innerRow.userName)});

                  media.mediaComments?.sort((row1,row2)=>{
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
                      return row.commentsOnComment.forEach(row=>{row.commentLikedBy = row.commentLikedBy.map(innerRow=>innerRow.userName)})
                    }
                  })
                  return media;
                })

                response.data.sort((row1,row2)=>{
                  var date1 = new Date(row1.mediaDate);
                  var date2 = new Date(row2.mediaDate);
                  return date2.getTime()-date1.getTime();
                });
                setCurrentPage(feedPrefUpdated?1:currentPage+1);
                if(!feedPrefUpdated){
                  setFeedArr([...feedArr,...response.data]);
                }else{
                  setFeedArr(response.data);
                  
                  setFeedPrefUpdated(false);
                }

            }).catch(err=>console.log(err));
        }
    const updateFeedPreference = async ()=>{
      if(show){
      const user={
        username:userCtx.getUsername(),
        feedPreference : selectedTags
      }

      await axios.post(mediaServiceUrl+"/feed/feed-preference",
      user,
      {
        headers:{
          "Authorization":userCtx.getToken()
        }
      })
      .then(res=>{
         setFeedPrefUpdated(true);
      }
      )
      .catch(err=>console.log(err));
   
    }
  
    }
   
    useEffect(()=>{
        fetchTags();
        fetchFeed();
    },[]);
    useEffect(()=>{
      fetchFeed();
    },[selectedTags])
    
    useEffect(()=>{
      setHasMoreData(true);
      fetchFeed();
    },[feedPrefUpdated])
return (<div className={themeCtx.darkMode?"bg-dark text-light":""}>
  <div> <Button ref={target} onClick={async () => {setShow(!show); updateFeedPreference();}}  >
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
                      defaultChecked={selectedTags?.includes(item)?true:false}
                      onChange={()=>{
                        if(selectedTags.includes(item)){
                          setSelectedTags(selectedTags.filter(i=>i!==item))
                          }else{
                            setSelectedTags([...selectedTags,item])
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
    <InfiniteScroll
  dataLength={feedArr?.length}
  next={fetchFeed}
  hasMore={hasMoreData}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>End of feed</b>
    </p>
  }>
  
    <div className="row row-cols-1 row-cols-md-3 gx-2 mx-auto mt-2" 
        style={{width:"90%"}}>
          {feedArr?.length<1?<SelectOrFollowMessage/>:
    feedArr.map((item,key)=>{
        return (<CardAndModal
                  num={key}
                  key={key} 
                  imageData={item}
                  refreshData={fetchFeed}
                  updateOneImage={updateOneImage}
              />
              )
        })
   }
    
    </div></InfiniteScroll>
    <UploadMediaModal/>
    </div>
)
}

export default HomePage;