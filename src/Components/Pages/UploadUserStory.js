import axios from "axios";
import {  useRef,useState,useContext } from "react";
import UserContext from "../Contexts/UserContext";
import { toast } from 'react-toastify';
import { feedUrl } from "../../ConfigFiles/Urls";
function UploadUserStory(props){
  const userCtx = useContext(UserContext);
  const modalCloseButtonHandle = useRef();
  const formHandle = useRef();
  let [selectedFile, changeSelectedFile ] = useState(null);
  function onFileChange(event){
        changeSelectedFile(event.target.files[0]);
    };
    
  function uploadMedia(event){
    event.preventDefault();
      const formData = new FormData();
      formData.append("image", selectedFile);
     axios.post(feedUrl+"/feed/story",formData,{
      headers: { 
        "Authorization":userCtx.getToken(),
        "Content-Type": 'multipart/form-data'
      }}).then((res) => {
        toast.info("Story uploaded!", {
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
      console.log(err);alert("Story Upload Error");});
      modalCloseButtonHandle.current.click();
      formHandle.current.reset();
      changeSelectedFile(null);
    };
    function fileData(){
        if (!selectedFile) {
            return (
                <div>
                    <br/><h4>Choose before Pressing the Upload button</h4>
                </div>
        );}};
   
    return (
    <div className="modal fade" id={"uploadUserStoryModal"} aria-labelledby="uploadModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header w-100 d-block">
            <div className="d-flex">
            <div className="mx-auto display-6 text-center">Upload Story</div>
          <button type="button" className="btn-close mt-2"   data-bs-dismiss="modal"  aria-label="Close" ref={modalCloseButtonHandle}></button>
          </div>
          <form className="text-center mt-3" ref={formHandle}>
          <div className="input-group mt-5">
              <input type="file" className="form-control" id="fileUpload" onChange={onFileChange}/>
              <label className="input-group-text" htmlFor="fileUpload" onClick={uploadMedia}>Upload</label>
          </div><br/>
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
export default UploadUserStory;