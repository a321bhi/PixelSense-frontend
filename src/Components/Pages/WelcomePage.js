import LoginForm from "../Forms/LoginForm";
function WelcomePage() {
  let from = "/home";
  return (
    <div className="App">
      <LoginForm from={from}/>
    </div>
  );
}
export default WelcomePage;
