import axios from "axios";
import {  useRef,useState } from "react";
import { baseUrl } from "../../ConfigFiles/Urls";
import './RegistrationFormStyle.css';
import { ToastContainer, toast } from 'react-toastify';
import { countryCodes } from "../../ConfigFiles/countryCallingCodes";
function RegistrationForm(){
  const modalCloseButtonHandle = useRef();
  const fullNameHandle = useRef();
  const emailHandle = useRef();
  const usernameHandle = useRef();
  const countryCodeHandle = useRef();
  const phoneHandle = useRef();
  const dateOfBirthHandle = useRef();
  const passwordHandle = useRef();
  const confirmPasswordHandle = useRef();
  const formHandle = useRef();
  let [usernameConflict, setUsernameConflict]= useState(false);
  let [passwordsNotMatching, setPasswordsNotMatching]= useState(false);
  let [validationClass, setvalidationClass]= useState("form-floating");

  function toggleValidationState(){
    setvalidationClass("form-floating was-validated")
    
  }
  let [currentSel, setCurrentSel] = useState("");
  function flipCountryName(){
    setCurrentSel(countryCodeHandle.current.selectedOptions[0].label);
    countryCodeHandle.current.selectedOptions[0].label=countryCodeHandle.current.value;
  }
  function togglePasswordsNotMatching(){

    if(passwordsNotMatching){
      setPasswordsNotMatching(false);
      
    }
  }
  function checkUsername(){
    
    if(usernameHandle.current.value!==""){
    axios.get(baseUrl+'/user/check/'+usernameHandle.current.value)
    .then(response=>{
      setUsernameConflict(response.data);

    });
  }
  }
  function signup(e){
    e.preventDefault();
    
    const fullName =fullNameHandle.current.value;
    const email = emailHandle.current.value;
    const password = passwordHandle.current.value;
    const username = usernameHandle.current.value;
    const countryCode = countryCodeHandle.current.value;
    const phone = phoneHandle.current.value;
    const dateOfBirth = dateOfBirthHandle.current.value;
    const confirmPassword = confirmPasswordHandle.current.value;

    var formInputs = [fullNameHandle,
                      emailHandle,passwordHandle,usernameHandle,
                      countryCodeHandle,phoneHandle,dateOfBirthHandle,confirmPasswordHandle];
    //if(fullName===""||email===""||username===""||countryCode===""||phone===""||dateOfBirth===""||password===""||confirmPassword===""){
    if(formInputs.some(forInput => forInput==="")){
      toggleValidationState();
    }
    else if(confirmPassword!==password){
      setPasswordsNotMatching(true);
    }else if(usernameConflict){

    }else{
      const user = {
        'fullName':fullName,
        'emailAddress':email,
        'username':username,
        'countryCode':countryCode,
        'phoneNumber':phone,
        'dateOfBirth':dateOfBirth,
        'password':password

      }
      axios.post(baseUrl+'/user/register', user).then(
       response=>{
         if(response.status===200){
          console.log("User added successfully");
          toast.info('User added successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss:false
            });
          formInputs.forEach(formInput =>{
            formInput.current.value="";
          });
         }
       } 
      );
      modalCloseButtonHandle.current.click();
//      formHandle.current.submit();
    }
  }
    return (
    <div className="modal fade" id="registerModal" aria-labelledby="registerModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header w-100">
            <div className="mx-auto display-6" >Register</div>
          <button type="button" className="btn-close"   data-bs-dismiss="modal"  aria-label="Close" ref={modalCloseButtonHandle}></button>
        </div>
        <div className="modal-body">
            <form className={validationClass} ref={formHandle}>
                <div className="my-3 form-floating">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="fullname" 
                      placeholder="Enter Full Name" 
                      name="fullname" 
                      ref={fullNameHandle}
                      required/>
                    <label className="form-label" htmlFor="fullname" >Full Name</label>
                    <div className="invalid-tooltip">
                      Please enter your name.
                    </div>
                </div>
                <div className="my-3 form-floating  mx-auto ">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="Enter email" 
                      name="email" 
                      ref={emailHandle}
                      required/>
                    <label className="form-label" htmlFor="email" >Email</label>
                    <div className="invalid-tooltip">
                      Please enter email.
                    </div>
                </div>
                <div className="my-3 form-floating mx-auto">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="username"  
                      placeholder="Enter Username" 
                      name="username" 
                      onChange={checkUsername}
                      ref={usernameHandle}
                      required/>
                    <label className="form-label" htmlFor="username" >Username</label>
                    <div className="invalid-tooltip">
                      Please enter your username.
                    </div>
                </div>
                {usernameConflict?<div className="my-3 mx-auto text-danger">Username already taken</div>:""
                }
                <div className="my-3 d-flex w-100">
                <div className="form-floating  w-25">
                    <select className="form-select" aria-label="select country code"
                              name="cc" 
                              id="cc" 
                              
                              onChange={flipCountryName}
                              ref={countryCodeHandle}
                          >
                      <option selected>Country code</option>
                      {countryCodes.countries.map((code,i)=>{
                          return <option key={i} value={code.code} label={code.name+" "+code.code}>{code.code}</option>
                      })}
                    </select>
                    
                    <label className="form-label" htmlFor="cc" >CC</label> 
                    </div>  
                    <div className="form-floating  w-75">
                    <input 
                      type="text" 
                      size="10" 
                      className="form-control" 
                      id="phone" 
                      name="phone" 
                      ref={phoneHandle}
                      required/>
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <div className="invalid-tooltip">
                      Please enter your phone.
                    </div>
                    </div>
                </div>  
                <div className="my-3 form-floating  mx-auto">
                    <input 
                      type="date" 
                      className="form-control" 
                      id="dob" 
                      placeholder="Enter date of birth"
                      name="dob" 
                      ref={dateOfBirthHandle}
                      required/>
                    <label className="form-label" htmlFor="dob" >Date of Birth</label>
                    <div className="invalid-tooltip">
                      Please enter your Date of Birth.
                    </div>
                </div>
                <div className="my-3 form-floating mx-auto">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="pwd" 
                      placeholder="Enter password" 
                      name="pwd" 
                      ref={passwordHandle}
                      required/>
                    <label className="form-label" htmlFor="pwd">Password</label>
                    <div className="invalid-tooltip">
                      Please enter your password.
                    </div>
                </div>
                <div className="my-3 form-floating mx-auto">
                    <input 
                      type="password" 
                      className="form-control" 
                      id="confirmPwd" 
                      placeholder="Enter password" 
                      name="confirmPwd" 
                      onChange={togglePasswordsNotMatching}
                      ref={confirmPasswordHandle}
                      required/>
                    <label className="form-label" htmlFor="confirmPwd">Re-type Password</label>
                    <div className="invalid-tooltip">
                      Please re-enter your password.
                    </div>
                </div>
                {passwordsNotMatching?<div className="my-3 mx-auto text-danger">Passwords should match</div>:""
                }
                <div className="my-3 form-check mx-auto text-center">
                    <button type="submit"  className="btn btn-primary w-50" onClick={signup}>Sign Up</button>
                </div>
            </form>
        </div>
      </div>
    </div>
    
                    <ToastContainer theme="dark"/>
  </div>
  );

}
export default RegistrationForm;