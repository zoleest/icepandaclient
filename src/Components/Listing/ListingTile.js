
import config from "../../config.json"
import {LanguageData} from "../../Contexts/Language-context";
import {useContext} from "react";



function ListingTile(props){

    const {languageData} = useContext(LanguageData);

    return(


        <div className={"col-12 col-md-"+(12/config.listing_per_row_md)+" col-lg-"+(12/config.listing_per_row_lg)}>
            <div className=" p-5 text-center text-light">
                <a className="link link-success text-decoration-none"
                   href={languageData.routes[props.value.type].path + "/" + props.value.data.character_name_slug + languageData.routes[props.value.type].subpath.profile} >
                    <div className="ratio ratio-1x1">
                        <img
                            src={config.server_address+"/images/profile_pictures/"+ props.value.data.character_name_slug + ".webp" } />
                    </div>
                    <h3 className="mt-2">
                        {props.value.data.character_name}</h3>
                </a>
            </div>
        </div>
    );


}

export default ListingTile;