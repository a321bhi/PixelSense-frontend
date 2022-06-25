import { useState,useEffect } from "react";
import axios from "axios";
function UploadMedia() {
    const [imgUrl, setImgUrl] = useState();
    const formDataForLoading = new FormData();
    formDataForLoading.append("mediaId","111");
const baseUrl = "http://localhost:8090/";
    const getImg = async () => {
        axios.post( "http://localhost:8101/"+'media/get',formDataForLoading).then(response=>{
        setImgUrl("data:image/jpg;base64,"+response.data.imageAsBase64);
    }
            )
      
      };
      
  useEffect(() => {
    getImg();
  }, []);

    let [selectedFile, changeSelectedFile ] = useState(null);
    function onFileChange(event){
          changeSelectedFile(event.target.files[0]);
      };
    function fileData(){
        if (selectedFile) {
            console.log(selectedFile);
          return (
            <div>
              <h2>File Details:</h2>
                <p>File Name: {selectedFile.name}</p>               
                <p>File Type: {selectedFile.type}</p>
                <p>
                    Last Modified:{" "}
                    {selectedFile.lastModifiedDate.toDateString()}
                </p>
            </div>
          );
        } else {
            return (
                <div>
                    <br/><h4>Choose before Pressing the Upload button</h4>
                </div>
        );}};
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
              "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmhpaml0IiwiYXV0aG9yaXRpZXMiOiJVU0VSIiwiZXhwIjoxNjU3MjE4NjAwfQ.Wv7CiSCystNbEMIGq8j93_ADGKqhtT5AZQB83lbHMUk',
              "Content-Type": 'multipart/form-data'
              // 'Authorization': 'Bearer '+ JWTToken,
            }}).then((res) => {
                alert("File Upload success");
              })
              .catch((err) => {alert("File Upload Error");
            console.log(err)});
          };
  return (
    <div className="text-center">
            
            <h1>
              Upload Media
            </h1>
            <div>
                <input type="file" onChange={onFileChange} />
                <button onClick={uploadMedia}>
                  Upload!
                </button><br/>
                {/* <img alt={"image"} src={URL.createObjectURL(selectedFile)} width={"50%;"} height={"50%;"}/> */}
                <img alt={"image"} src={imgUrl} width={"50%;"} height={"50%;"}/>
            </div>
          {fileData()}
        </div>
  );
}
export default UploadMedia;
