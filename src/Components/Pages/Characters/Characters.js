import axios from 'axios';
import {useContext} from "react";
import {useAsync, IfFulfilled} from "react-async";
import {LanguageData} from "../../../Contexts/Language-context";
import Listing from "../../Listing/Listing"

import config from "../../../config.json";

async function getUsers(){
   let results = await axios.get(config.server_address + "/characters/list");
   return results.data;
}



function Characters() {

    const {languageData} = useContext(LanguageData);


    let state = useAsync({promiseFn: getUsers});

    return(<IfFulfilled state={state}>

            {data=> <Listing
                value={{dataToRender: data, type: "characters"}} /> }

        </IfFulfilled>

    );


}

export default Characters;