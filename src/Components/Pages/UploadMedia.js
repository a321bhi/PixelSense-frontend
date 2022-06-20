import { useState,useEffect } from "react";
import axios from "axios";
function UploadMedia() {
    const [imgUrl, setImgUrl] = useState();

    const getImg = async () => {
        axios.get('media/all').then(response=>{
        setImgUrl("data:image/jpg;base64,"+response.data[0]);
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
            console.log(selectedFile)
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
  return (
    <div className="text-center">
            
            <h1>
              Upload Media
            </h1>
            <div>
                <input type="file" onChange={onFileChange} />
                <button >
                  Upload!
                </button><br/>
                <img alt={"image"} src={imgUrl} width={"50%;"} height={"50%;"}/>
            </div>
          {fileData()}
        </div>
  );
}
export default UploadMedia;
