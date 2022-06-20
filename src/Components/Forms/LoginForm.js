import { useNavigate } from 'react-router-dom';
import { useContext, useRef } from 'react';
import UserContext from '../Contexts/UserContext';
import RegistrationForm from "./RegistrationForm";
import axios from 'axios';

function LoginForm(){

const navigate = useNavigate();

let userCtx = useContext(UserContext);
let usernameHandler = useRef();
let passwordHandler = useRef();
    function loginFunction(event){
        event.preventDefault();
        const username = usernameHandler.current.value;
        const password = passwordHandler.current.value;
        const user = {
            'userName':username,
            'password':password
          }
        axios.post('/user/login', user).then(
            response=>{
              if(response.status===200){
               console.log("login successful");
               userCtx.toggleLogin(usernameHandler.current.value);
               navigate('/home');   
              }
            } 
           );
       
    }
return (
    <div>
    <div className="shadow col-10 pt-5 container card p-5 mt-5 h-75 col-lg-4">
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
    </div>
    <RegistrationForm/>
    </div>
);
}
export default LoginForm;