import classes from './CardView.css';

function CardView(props){
return (
<div className="card col-sm-3 col-12 mt-3 ms-1 mx-auto h-75">
            <div className="card-header">
                Featured
              </div>
              <div className="card-body">
                <h5 className="card-title">Title, Location</h5>
              <img className="w-100 h-100" src={props.source}/>
              </div>
              <div className="card-footer text-muted">
                Posted by 
              </div>
        </div>
);
}
export default CardView;