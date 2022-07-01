import { useNavigate } from 'react-router-dom';
function HeaderName(){
    const navigate = useNavigate();
    function navigateToHome(){
        navigate('/home');
    }
return(
<div >
<h1 className="p-1 text-center fs-1 my-3 ms-4 fst-italic rounded " role="button" onClick={navigateToHome} 
style={{width:"15vw",fontFamily:"Dancing Script, cursive",fontWeight:"bold"}}>
Pixels
</h1>

</div>
)
}
export default HeaderName;