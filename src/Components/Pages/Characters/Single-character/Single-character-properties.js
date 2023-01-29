
import config from "../../../../config.json";
import '../Characters.scss';

function SingleCharacterProperties(props){


    return(
        <div className="col-12 col-lg-6 text-center pt-3">
        <img className = "property_picture w-75 ratio ratio-1x1" src={config.server_address+"/images/properties/"+ props.value.id + ".webp"}
        alt={props.value.name} title={props.value.name}
        />
        <h5>{props.value.name}</h5>
        </div>);
}
export default SingleCharacterProperties;