import LoginForm from "../Forms/LoginForm";
import WelcomeMessage from "../UXMessages/WelcomeMessage";
function WelcomePage() {
  let from = "/home";
  return (
    <div className="container">
      <div className="row">
        <div className=" col-md-6">
      {/* <WelcomeMessage/> */}
      </div>
      <div className="col-12 col-md-6 border p-5" style={{marginTop:"10vh", height:"60vh"}}>
      <LoginForm from={from}/>
      </div>
      </div>
    </div>
  );
}
export default WelcomePage;
