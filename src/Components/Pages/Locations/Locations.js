import axios from 'axios';
import {useContext} from "react";
import {useAsync, IfFulfilled, IfRejected, IfPending} from "react-async";
import {LanguageData} from "../../../Contexts/Language-context";
import Listing from "../../Listing/Listing"
import Error from "../../Error/Error"
import Loading from "../../Loading/Loading"

import config from "../../../config.json";
import {useParams} from "react-router";

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

async function getLocations(props){

    let serverTag =  getKeyByValue(props.languageData.routes.locations.subpath, '/'+props.tag);

    let results = await axios.get(config.server_address + "/game/" + serverTag +"/list/" + props.pg + "/");
    console.log(results.status);
    if(results.status === 400){
        throw TypeError(results.data.error)
    }

    return results.data;
}



function Locations(params) {

    let {tag, pg} = useParams();
    const {languageData} = useContext(LanguageData);


    let state = useAsync({promiseFn: getLocations, tag: tag, pg: pg, languageData: languageData});

    return(<div>
            <IfPending state={state}>
                <Loading/>
            </IfPending>
            <IfFulfilled state={state}>

                {data=>(data.error===undefined?<Listing
                    value={{dataToRender: data, type: "locations"}} />: <Error value={languageData.pages.characters.loading_error}/>)}
            </IfFulfilled>
            <IfRejected state={state}>
                <Error value={languageData.pages.characters.loading_error} />
            </IfRejected>
        </div>

    );


}

export default Locations;