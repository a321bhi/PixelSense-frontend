import { Carousel,Modal,Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
function StoryCarousel(props){
    
return  <Modal
{...props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
</Modal.Header>
<Modal.Body>
<Carousel style={{height:"70vh"}}>
   { props?.images.length>0?
        props.images.map(item=>{
        return <Carousel.Item interval={5000}>
        <img className="d-block w-100"
            src={"data:image/jpg;base64,"+item.imageAsBase64}
            style={{objectFit:"cover"}}
        />
        
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