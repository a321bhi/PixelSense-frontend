import { useNavigate } from 'react-router-dom';
function HeaderName(){
    const navigate = useNavigate();
    function navigateToHome(){
        navigate('/home');
    }
return(
<div >
<h1 className="w-25 mx-auto  p-3 text-center" role="button" onClick={navigateToHome} >
PixelSense
</h1>

</div>
)
}
export default HeaderName;