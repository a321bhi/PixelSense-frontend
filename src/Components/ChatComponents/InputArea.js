import {  useRef } from 'react';
import './InputArea.module.css';
function InputArea(){
    let chatMessageHandler = useRef();
    function sendMessage(event){
        event.preventDefault();

        const message = chatMessageHandler.current.value;
        // const user = {
        //     'userName':username,
        //     'password':password
        //   }
        // axios.post('/user/login', user).then(
        //     response=>{
        //       if(response.status===200){
        //        console.log("login successful");
        //        userCtx.toggleLogin(usernameHandler.current.value);
        //        navigate('/home');   
        //       }
        //     } 
        //    );
       
    }
return <div className="">
    <form action="" className="chatInputForm container-fluid d-flex">
        <div className="my-1 form-floating mx-auto w-100">
            <input 
                type="text" 
                className="form-control" 
                id="chatmessage"
                placeholder="Enter your message.." 
                name="message" 
                ref={chatMessageHandler} 
                required/>
            <label htmlFor="chatmessage" >Enter your message</label>
        </div>
        <div className="my-1 form-check mx-auto text-center">
            <button type="Submit" className="btn btn-primary w-100 h-100" onClick={sendMessage}>Send</button>
        </div>
    </form>
    </div>
}

export default InputArea;