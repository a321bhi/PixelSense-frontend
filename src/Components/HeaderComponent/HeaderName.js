import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeContext from '../Contexts/ThemeContext';
function HeaderName(){
    let themeCtx = useContext(ThemeContext);
    const navigate = useNavigate();
    function navigateToWelcome(){
        navigate('/');
    }
return(
<div >
<h1 className={"p-1 text-center fs-1 my-3 ms-4 fst-italic rounded "+(themeCtx.darkMode?"bg-dark text-light":"")} role="button" onClick={navigateToWelcome} 
style={{width:"15vw",fontFamily:"Dancing Script, cursive",fontWeight:"bold"}}>
Pixels
</h1>

</div>
)
}
export default HeaderName;