import axios from "axios";
import {  useRef,useState,useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { baseUrl } from "../../ConfigFiles/Urls";
import { toast } from 'react-toastify';
function UploadMediaModal(props){
  const tagsRef = useRef(null);
  const [tagsState,setTagsState] = useState([]);
  const userCtx = useContext(UserContext);
  const modalCloseButtonHandle = useRef();
  const formHandle = useRef();
  const captionHandle = useRef()
  let [selectedFile, changeSelectedFile ] = useState(null);
  function onFileChange(event){
        changeSelectedFile(event.target.files[0]);
    };
    
  function uploadMedia(event){
    event.preventDefault();
      const formData = new FormData();
      formData.append("image", selectedFile);
      if(!props?.profilePic){
        let captionToBeUploaded = captionHandle.current.value;
        //let tagsToBeUploaded =tagsState.map(tags=>tags.replace("#",""));
        //tagsToBeUploaded = tagsToBeUploaded?.length>0?tagsToBeUploaded:[];
        let tagsToBeUploaded = tagsRef.current.innerHTML.split(",").map(tags=>tags.replace("#",""));
        // tagsToBeUploaded =tagsToBeUploaded
        formData.append("mediaTags",tagsToBeUploaded);
        formData.append("mediaCaption",captionToBeUploaded);
      }
      const urlForUpload = baseUrl + (props?.profilePic?"/user/profile-pic":"/media/");
     axios.post(urlForUpload,formData,{
      headers: { 
        "Authorization":userCtx.getToken(),
        "Content-Type": 'multipart/form-data'
      }}).then((res) => {
        toast.info("Image Uploaded!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          pauseOnFocusLoss:false
          });
 
            try{
              props.updateFunction();
            }catch(err){

            }
        })
        .catch((err) => {
      console.log(err);alert("File Upload Error");});
      modalCloseButtonHandle.current.click();
      formHandle.current.reset();
      changeSelectedFile(null);
      setTagsState([]);
    };
    function fileData(){
        if (!selectedFile) {
            return (
                <div>
                    <br/><h4>Choose before Pressing the Upload button</h4>
                </div>
        );}};
    function checkCaption(){
      let text = captionHandle.current.value;
      if(text.includes("#")){  
        tagsRef.current.innerHTML = text.match(/#(\w+)/g);
      }else{
        tagsRef.current.innerHTML="None";
      }
      console.log(tagsRef.current.innerHTML?.length)
    }
    return (
    <div className="modal fade" id={props.multiModal?props.multiModal:"uploadMediaModal"} aria-labelledby="uploadModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header w-100 d-block">
            <div className="d-flex">
            <div className="mx-auto display-6 text-center">{props.profilePic?"Update Profile Pic":"Upload Media"}</div>
          <button type="button" className="btn-close mt-2"   data-bs-dismiss="modal"  aria-label="Close" ref={modalCloseButtonHandle}></button>
          </div>
          <form className="text-center mt-3" ref={formHandle}>
          <div className="input-group mt-5">
              <input type="file" className="form-control" id="fileUpload" onChange={onFileChange}/>
              <label className="input-group-text" htmlFor="fileUpload" onClick={uploadMedia}>Upload</label>
          </div><br/>
                {props.profilePic ?"":
            <div className="mb-2 form-floating mx-auto">
                    <input 
                      type="text" 
                      className="form-control" 
                      size="250"
                      id="caption"  
                      placeholder="Enter Caption" 
                      name="caption" 
                      onChange={checkCaption}
                      ref={captionHandle}
                      />
                    <label className="form-label" htmlFor="caption" >Caption</label>
                    <div className="invalid-tooltip">
                      Enter media caption
                    </div>
                    <div>{"Tags:  "}</div> <div ref={tagsRef}>{"None"}
                      </div>
                </div>
      }
          {fileData()}
        </form>
        </div>
        <div className="modal-body w-100" style={{height:"50vh"}}>
        {selectedFile?<img className="mw-100 mh-100 mx-auto d-block" alt={"image"} src={URL.createObjectURL(selectedFile)} />:""}
        </div>
      </div>
    </div>
  </div>
  );

}
export default UploadMediaModal;