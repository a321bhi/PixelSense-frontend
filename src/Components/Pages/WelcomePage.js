import LoginForm from "../Forms/LoginForm";
import WelcomeMessage from "../UXMessages/WelcomeMessage";
function WelcomePage() {
  let from = "/home";
  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
      {/* <WelcomeMessage/> */}
      </div>
      <div className="col-4 border p-5" style={{marginTop:"10vh", height:"50vh"}}>
      <LoginForm from={from}/>
      </div>
      </div>
    </div>
  );
}
export default WelcomePage;
