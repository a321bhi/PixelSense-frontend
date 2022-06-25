import LoginForm from "../Forms/LoginForm";
import {useLocation} from "react-router-dom";
function WelcomePage() {
  let location = useLocation();

  return (
    <div className="App">
      {
      location.state?.redirected?"You must login first":""
      }
      <LoginForm/>
    </div>
  );
}
export default WelcomePage;
