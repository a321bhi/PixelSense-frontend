import { useNavigate } from "react-router";
import UploadMediaModal from "./UploadMediaModal";
import ListGroup from 'react-bootstrap/ListGroup';
function ActiveChats() {
  const navigate = useNavigate();
  var chatsFrom = ['Trinity','Morpheus','Thomas Anderson','Niobe'];
  function openChat(user) {
    navigate('/chats/'+user);
  }
  return <div className="w-75 mx-auto shadow-lg" style={{height:"75vh"}}>
    {chatsFrom.length===0?"No data"
        :<ListGroup className="w-100 mx-auto mt-5" >
            {chatsFrom.map((item,i)=>
                              {return <ListGroup.Item 
                                        action 
                                          variant="primary" 
                                          className="text-start mt-2 w-75 mx-auto" 
                                          key={i} 
                                          onClick={()=>openChat(item)}
                                          style={{height:"5vh"}}
                                          >
                                            {item}
                                      </ListGroup.Item>
                              }
                          )
            }
          </ListGroup>
      }
      <UploadMediaModal/>
  </div>
  ;
}

export default ActiveChats;
