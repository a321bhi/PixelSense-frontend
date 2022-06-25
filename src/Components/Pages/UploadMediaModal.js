import axios from "axios";
import {  useRef,useState } from "react";

function UploadMediaModal(){
  const modalCloseButtonHandle = useRef();
  const formHandle = useRef();
  const caption = useRef()
  const formDataForLoading = new FormData();
  formDataForLoading.append("mediaId","111");
const baseUrl = "http://localhost:8090/";
  let [selectedFile, changeSelectedFile ] = useState(null);
  function onFileChange(event){
        changeSelectedFile(event.target.files[0]);
    };
  function uploadMedia(){
    console.log(selectedFile);
      const formData = new FormData();
      
      formData.append("image", selectedFile);
      formData.append("mediaId","111");
      formData.append("mediaDate",new Date());
      formData.append("mediaTags",["mediaTags"]);
      formData.append("mediaCaption","mediaCaption");
     axios.post(baseUrl+"media/add",formData,{
      headers: { 
        "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmhpaml0IiwiYXV0aG9yaXRpZXMiOiJVU0VSIiwiaWF0IjoxNjU2MTgwOTM5LCJleHAiOjE2NTczMDUwMDB9.vNum1RVEv4yN7zFzRGlqNNRsER0OKoR8GqR9vv7yGd0',
        "Content-Type": 'multipart/form-data'
        // 'Authorization': 'Bearer '+ JWTToken,
      }}).then((res) => {
          alert("File Upload success");
        })
        .catch((err) => {alert("File Upload Error");
      console.log(err)});
      modalCloseButtonHandle.current.click();
    };
    function fileData(){
        if (!selectedFile) {
            return (
                <div>
                    <br/><h4>Choose before Pressing the Upload button</h4>
                </div>
        );}};
    return (
    <div className="modal fade" id="uploadMediaModal" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header w-100 d-block">
            <div className="d-flex">
            <div className="mx-auto display-6 text-center" >Upload Media</div>
          <button type="button" className="btn-close mt-2"   data-bs-dismiss="modal"  aria-label="Close" ref={modalCloseButtonHandle}></button>
          </div>
          <form className="text-center mt-3" ref={formHandle}>
          <input type="file" onChange={onFileChange} />
                <button onClick={uploadMedia}>
                  Upload!
                </button><br/>
            <div className="my-3 form-floating mx-auto">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="caption"  
                      placeholder="Enter Caption" 
                      name="caption" 
                    //   onChange={checkCaption}
                      ref={caption}
                      />
                    <label className="form-label" htmlFor="caption" >Caption</label>
                    <div className="invalid-tooltip">
                      Enter media caption
                    </div>
                </div>
      
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