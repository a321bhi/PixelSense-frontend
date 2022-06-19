import './CardView.css';

function CardView(props){
return (
<div className="card vh-25">
            <div className="card-header">
                Featured
              </div>
              <div className="card-body">
                <h5 className="card-title">Title, Location</h5>
                <img className="imgclass" src={props.source}/>
              </div>
              <div className="card-footer text-muted">
                Posted by 
              </div>
        </div>
);
}
export default CardView;