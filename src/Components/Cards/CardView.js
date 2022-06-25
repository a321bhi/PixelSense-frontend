import './CardView.css';
import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
function CardView(props){
  let [imageLoaded, setImageLoadedState] = useState(false);
  let [spinnerClasses,setSpinnerClasses] = useState("d-block mx-auto mt-3");
  let [imgClasses,setImgClasses] = useState("d-none");
useEffect(()=>{
if(imageLoaded){
  setSpinnerClasses("d-none");
  setImgClasses("imgclass");
}
},[imageLoaded])
return (
  <div className="col g-3">
<div className="card vh-25" >
            <div className="card-header">
                Featured
              </div>
              <div className="card-body" style={{minHeight:"20vh"}}>
                <h5 className="card-title">Title, Location</h5>
                <div className={spinnerClasses} style={{height:"40px",width:"40px"}} role="status">
                </div>
                <Spinner className={spinnerClasses} animation="border" role="status">
                </Spinner>
                <img className={imgClasses} onLoad={()=>setImageLoadedState(true)} src={props.source} role="button" onClick={()=>props.showImageModal(props.source)}/>
              </div>
              <div className="card-footer text-muted">
                Posted by 
              </div>
        </div>
        </div>
);
}
export default CardView;