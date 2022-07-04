import UploadMediaModal from "./UploadMediaModal";
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/nav';
import ChatPage from './ChatPage';
import axios from "axios";
import UserContext from "../Contexts/UserContext";
import { useContext,useEffect,useState } from "react";
import NoMessages from "../UXMessages/NoMessages";
import NoChats from "../UXMessages/NoChats";
import SockJS from "sockjs-client";
import * as Stomp from 'stompjs';
import MiniUserCard from "../Cards/MiniUserCard";

function ActiveChats() {
  let [allChats,setAllChats] = useState([]);
  let [users, setUsers] = useState([]);
  let [dataLoaded, setDataLoaded] = useState(false);
let userCtx = useContext(UserContext);
  function connect() {
  if( userCtx.stompClient===null){
    var socket = new SockJS('http://localhost:8103/gs-guide-websocket');
    let stompClient = Stomp.over(socket);
    userCtx.setStompClient(stompClient);
    stompClient.connect({headers:{ "Authorization":userCtx.getToken()}}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/'+(userCtx.username), function (greeting) {
            console.log(JSON.parse(greeting.body).content);
        });
    });
}}
 
const getUsersFromContext= ()=>{
  return [...userCtx?.userProfile?.follower,
          ...userCtx?.userProfile?.following];
}
  const getAllChats= ()=>{
    const formData = new FormData();
  
    formData.append("username",userCtx.username);
    axios.post("http://localhost:8103/getChats",formData).then(res=>{setAllChats(res.data);
      setDataLoaded(true);
    }
    ).catch(err=>console.log(err));

    let temp = [];
    allChats.forEach(message=>{
      if(message.usernameFrom===userCtx.username){
        temp.push(message.usernameTo);
      }else{
        temp.push(message.usernameFrom);
      }
    });
    temp.push(...getUsersFromContext());
    temp.push(...users);
    let outputArray = Array.from(new Set(temp));
    setUsers(outputArray);
    allChats.sort((first,second)=>{
      var date1 = new Date(first.sentTime);
      var date2 = new Date(second.sentTime);
      return date1.getTime()-date2.getTime();
  })
}

  useEffect(()=>{
    getAllChats();
    connect();
  },[dataLoaded])

  return <div className="w-sm-100 w-75 mx-auto border mt-5" style={{height:"75vh"}}>
    <Tab.Container id="left-tabs" defaultActiveKey="-" >
      <Row className="w-100 g-0">
        <Col className="col-4">
          {!dataLoaded || users.length===0?<div className="border" style={{height:"75vh"}}><NoChats/></div>
            :<Nav variant="pills" className="flex-column border" style={{height:"75vh"}}>
            {users.map((item,i)=>
                    {if(item!==userCtx.username){return <Nav.Item
                      action variant="primary" 
                      className="text-start w-100" 
                      key={i}>
                     <Nav.Link className="border" role="button" style={{height:"7vh"}} eventKey={item}><MiniUserCard disableProfileLink={true} username={item}></MiniUserCard></Nav.Link>
                    </Nav.Item>}
                    })
            }
          </Nav>}
      </Col>
      <Col className="col-8" >
      {!dataLoaded || users.length===0?<NoMessages/>
            :<Tab.Content>
              <Tab.Pane eventKey="-"><NoMessages></NoMessages></Tab.Pane>
            {users.map(item=>
                              {return <Tab.Pane eventKey={item}>
                                        <ChatPage message={allChats.filter(message=>{
                                          if(message.usernameFrom===userCtx.username){
                                            return item===message.usernameTo;
                                          }else{
                                            return item===message.usernameFrom;
                                          }
                                        })}
                                        user={item}
                                        callRefresh={getAllChats}
                                        />
                                      </Tab.Pane>
                              }
                          )
                            }
         </Tab.Content>
      }
      </Col>
      </Row>
      </Tab.Container>
      <UploadMediaModal/>
  </div>
  ;
}

export default ActiveChats;
