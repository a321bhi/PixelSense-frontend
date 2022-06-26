import LoginForm from "../Forms/LoginForm";
import {useLocation} from "react-router-dom";
function LoginPage() {
  let location = useLocation();
  let from = location.state?.from?.pathname || "/home";
  return (
    <div className="App">
      <LoginForm from={from} fromRedirect={true}/>
    </div>
  );
}
export default LoginPage;
