import LoginForm from "../Forms/LoginForm";
import {useLocation} from "react-router-dom";
function LoginPage() {
  let location = useLocation();
  let from = location.state?.from?.pathname || "/home";
  return (
    <div className="border col-lg-4 col-10 container p-5 mt-5 ">
      <LoginForm from={from} fromRedirect={true}/>
    </div>
  );
}
export default LoginPage;
