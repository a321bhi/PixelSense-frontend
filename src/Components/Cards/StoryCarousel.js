import { Carousel,Modal,Button } from "react-bootstrap";
import { timeSince } from "../../ConfigFiles/timeSince";
import 'bootstrap/dist/css/bootstrap.min.css';
function StoryCarousel(props){
    
return  <Modal
{...props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header className="w-100" closeButton>
  
  <div className="fs-3 w-100">{props.header}</div>
</Modal.Header>
<Modal.Body>
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
<Modal.Footer>
  <Button onClick={props.onHide}>Close</Button>
</Modal.Footer>
</Modal>

}
export default StoryCarousel;