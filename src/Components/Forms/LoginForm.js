import { useNavigate,useLocation } from 'react-router-dom';
import { useContext, useRef } from 'react';
import UserContext from '../Contexts/UserContext';
import RegistrationForm from "./RegistrationForm";
import axios from 'axios';
import { baseUrl, chatServiceUrl } from '../../ConfigFiles/Urls';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { ToastContainer, toast } from 'react-toastify';
function LoginForm(props){
   
  

const navigate = useNavigate();

let userCtx = useContext(UserContext);
let usernameHandler = useRef();
let passwordHandler = useRef();
let maxTries = 5;


function connect(username,token) {
    var socket = new SockJS(chatServiceUrl+'/gs-guide-websocket');
    let stompClient = Stomp.over(socket);
    userCtx.setStompClient(stompClient);
    stompClient.connect( {headers:{ "Authorization":token}}, function (frame) {
        console.log('Connected to WS');
        stompClient.subscribe('/topic/'+username, function (message) {
            toast.info(JSON.parse(message.body).usernameFrom+": "+JSON.parse(message.body).message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                pauseOnFocusLoss:false
                });
        }
        );
    },()=>{
        if(maxTries>0){
            maxTries-=1;
            connect();

        }
    }

    );
}
    function loginFunction(event){
        event.preventDefault();
        const username = usernameHandler.current.value;
        const password = passwordHandler.current.value;
        const userCredential = {
            'username':username,
            'password':password
          }
        axios.post(baseUrl+'/user/login', userCredential).then(
            response=>{
              if(response.status===200){
               localStorage.setItem("USERNAME", username);
               localStorage.setItem("JWT", response.headers.authorization);
               userCtx.toggleLogin(usernameHandler.current.value,response.headers.authorization);
               
               connect(username,response.headers.authorization);
               navigate(props?.from, { replace: true });  
              }else if(response.status===204){
                toast.error('Username does not exist', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss:false
                    });
              }
            } 
           ).catch(err=>{
            console.log(err);
            if(err.response.status===401){
                toast.error('Wrong password!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    pauseOnFocusLoss:false
                    });
            }});
    }
return (
    <div>
   
{props?.fromRedirect?<div className='text-danger fs-5 text-center mb-2'>Please login first</div>:""}
    <form action="" className="">
        <div className="text-center display-6">Login</div>
        <div className="my-3 form-floating  mx-auto">
            <input 
                type="text" 
                className="form-control" 
                id="loginUsername" 
                placeholder="Enter username" 
                name="username" 
                ref={usernameHandler} 
                required/>
            <label htmlFor="username">Username</label>
        </div>
        <div className="my-3 form-floating mx-auto">
            <input 
                type="password" 
                className="form-control" 
                id="loginpwd" 
                placeholder="Enter password" 
                name="loginpwd" 
                ref={passwordHandler} 
                required/>
            <label htmlFor="loginpwd" >Password</label>
        </div>
        <div className="my-3 form-check mx-auto w-75 ">
            <label className="form-check-label">
                <input className="form-check-input" type="checkbox" name="remember"/>
                Remember me
            </label>
        </div>
        <div className="my-3 form-check mx-auto text-center">
            <button type="Submit" className="btn btn-primary w-75 " onClick={loginFunction}>Login</button>
        </div>
    </form>
    <div className="text-center">Don't have an account? <a href="#" data-bs-toggle="modal" data-bs-target="#registerModal">Sign up</a></div>
    <RegistrationForm/>
    </div>
);
}
export default LoginForm;