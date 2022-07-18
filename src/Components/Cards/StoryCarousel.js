import { Carousel,Modal,Button } from "react-bootstrap";
import { timeSince } from "../../ConfigFiles/timeSince";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import ThemeContext from "../Contexts/ThemeContext";
function StoryCarousel(props){
    let themeCtx = useContext(ThemeContext)
return  <Modal
{...props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered

>
<Modal.Header className={"w-100 "+(themeCtx.darkMode?"bg-dark text-light":"")} closeButton>
  
  <div className={"fs-3 w-100 "+(themeCtx.darkMode?"bg-dark text-light":"")} >{props.header}</div>
</Modal.Header>
<Modal.Body className={(themeCtx.darkMode?"bg-dark text-light":"")} >
<Carousel variant="dark" style={{height:"70vh"}}>
   { props?.images.length>0?
        props.images.map(item=>{
        return <Carousel.Item   interval={5000} style={{height:"70vh",width:"100%"}}>
        <img className="d-block mx-auto"
            src={"data:image/jpg;base64,"+item.imageAsBase64}
            style={{objectFit:"contain",height:"80%", width:"80%"}}
        />
        <div className="mt-5 position-absolute bottom-0 ">uploaded - {timeSince(item.timestamp)} ago</div>
        </Carousel.Item>
    }):""
    }
</Carousel>
</Modal.Body>
<Modal.Footer className={(themeCtx.darkMode?"bg-dark text-light":"")} >
  <Button onClick={props.onHide}>Close</Button>
</Modal.Footer>
</Modal>

}
export default StoryCarousel;