import CardView from "../Cards/CardView";
import UserContext from "../Contexts/UserContext";
import { useContext } from "react";

function HomePage(){
    let userCtx = useContext(UserContext);
    const baseUrl = './sampleImages/img';
    let arr = [...Array(9).keys()];
return (<div>
    logged in as {userCtx.username}
    <div className="container-fluid d-sm-flex flex-sm-wrap">
        
        {arr.length?
        arr.map(item=>{
            return <CardView key={item} source={require(baseUrl+(item+1)+'.jpg')}/>
})
        :"No Data"
    }
    </div>
    </div>
)
}

export default HomePage;