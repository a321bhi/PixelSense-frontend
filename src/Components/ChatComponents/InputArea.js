import { useContext, useRef } from 'react';
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

    <div className="shadow col-3 pt-5 container card p-5 mt-5 h-75">
    <form action="" className="">
        <div className="my-3 form-floating mx-auto">
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
        <div className="my-3 form-check mx-auto text-center">
            <button type="Submit" className="btn btn-primary w-50" onClick={sendMessage}>Send</button>
        </div>
    </form>
    </div>
}

export default InputArea;