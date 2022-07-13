import axios from "axios";
import { countryCodes } from "../../ConfigFiles/countryCallingCodes";
import {  useEffect, useRef,useState } from "react";
import { baseUrl } from "../../ConfigFiles/Urls";
import './RegistrationFormStyle.css';
import { useContext } from "react";
import { toast } from "react-toastify";
import UserContext from "../Contexts/UserContext";
import moment from 'moment';
function ProfileUpdationForm(){
  
  let userCtx = useContext(UserContext);
  const modalCloseButtonHandle = useRef();
  const fullNameHandle = useRef();
  const emailHandle = useRef();
  const countryCodeHandle = useRef();
  const phoneHandle = useRef();
  const dateOfBirthHandle = useRef();
  const formHandle = useRef();
  let [validationClass, setvalidationClass]= useState("form-floating");
  
  const populateFields = async ()=>{
        
    await axios.get(baseUrl+"/user/"+(userCtx.getUsername()),
         {
           headers: { 
             "Authorization":userCtx.getToken()
           }
         },).then(response=>{
       
    fullNameHandle.current.value = response.data.fullName;
    emailHandle.current.value = response.data.emailAddress;
    countryCodeHandle.current.value = response.data.countryCode ;
    phoneHandle.current.value = response.data.phoneNumber;
    dateOfBirthHandle.current.value = moment(response.data.dateOfBirth).format("yyyy-MM-D");
           userCtx.setUserProfile(response.data);
         })
         .catch(err=>console.log(err));
   }
   useEffect(()=>{
    populateFields();
   },[])
  function toggleValidationState(){
    setvalidationClass("form-floating was-validated")
    
  }
  let [currentSel, setCurrentSel] = useState("");
  function flipCountryName(){
    setCurrentSel(countryCodeHandle.current.selectedOptions[0].label);
    countryCodeHandle.current.selectedOptions[0].label=countryCodeHandle.current.value;
  }
  function updateProfile(e){
    e.preventDefault();
    
    const fullName =fullNameHandle.current.value;
    const email = emailHandle.current.value;
    const countryCode = countryCodeHandle.current.value;
    const phone = phoneHandle.current.value;
    const dateOfBirth = dateOfBirthHandle.current.value;
   

    var formInputs = [fullNameHandle,
                      emailHandle,
                      countryCodeHandle,phoneHandle,dateOfBirthHandle];

    if(formInputs.some(forInput => forInput==="")){
      toggleValidationState();
    }
    else{
      const user = {
        'fullName':fullName,
        'emailAddress':email,
        'countryCode':countryCode,
        'phoneNumber':phone,
        'dateOfBirth':dateOfBirth,
      }
      axios.patch(baseUrl+'/user/profile', user,
      {
        headers: { 
          "Authorization":userCtx.getToken()
        }
    },).then(
       response=>{
         if(response.status===200){
  
          toast.info("User updated successfully!", {
            position: "top-center",
            autoClose: 2000,
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
    <div className="modal fade" id="profileUpdateModal" aria-labelledby="profileUpdateModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header w-100">
            <div className="mx-auto display-6" >Update Profile</div>
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
                <div className="my-3 form-check mx-auto text-center">
                    <button type="submit"  className="btn btn-primary w-50" onClick={updateProfile}>Update Profile</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  </div>
  );

}
export default ProfileUpdationForm;