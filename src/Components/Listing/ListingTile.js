
import config from "../../config.json"
import {LanguageData} from "../../Contexts/Language-context";
import {useContext} from "react";



function ListingTile(props){

    const {languageData} = useContext(LanguageData);

    let path;
    let imgSrc;
    let name;

    if(props.value.type === 'characters')
    {
        path = languageData.routes[props.value.type].path + "/" + props.value.data.character_name_slug + languageData.routes[props.value.type].subpath.profile;
        imgSrc=config.server_address+"/images/profile_pictures/"+ props.value.data.character_name_slug + ".webp";
        name = props.value.data.character_name;
    }else if(props.value.type === 'locations'){
        path = languageData.routes[props.value.type].path + "/" + props.value.data.location_slug + '/1/';
        imgSrc=config.server_address+"/images/locations/"+ props.value.data.location_slug + ".webp";
        name = props.value.data.location_name;
    }
    return(


        <div className={"col-12 col-md-"+(12/config.listing_per_row_md)+" col-lg-"+(12/config.listing_per_row_lg)}>
            <div className=" p-5 text-center text-light">
                <a className="link link-success text-decoration-none"
                   href={path} >
                    <div className="ratio ratio-1x1">
                        <img
                            src={imgSrc} alt={name} title={name} />
                    </div>
                    <h3 className="mt-2">
                        {name}</h3>
                </a>
            </div>
        </div>
    );


}

export default ListingTile;