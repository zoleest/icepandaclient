import axios from 'axios';
import {useContext} from "react";
import {useAsync, IfFulfilled, IfRejected, IfPending} from "react-async";
import {LanguageData} from "../../../Contexts/Language-context";
import Listing from "../../Listing/Listing"
import Error from "../../Error/Error"
import Loading from "../../Loading/Loading"

import config from "../../../config.json";

async function getUsers(){
   let results = await axios.get(config.server_address + "/characters/list");
   console.log(results.status);
   if(results.status === 400){
        throw TypeError(results.data.error)
   }

  return results.data;
}



function Characters() {

    const {languageData} = useContext(LanguageData);


    let state = useAsync({promiseFn: getUsers});

    return(<div>
            <IfPending state={state}>
                <Loading/>
            </IfPending>
            <IfFulfilled state={state}>

            {data=>(data.error===undefined?<Listing
                value={{dataToRender: data, type: "characters"}} />: <Error value={languageData.pages.characters.loading_error}/>)}
            </IfFulfilled>
            <IfRejected state={state}>
                <Error value={languageData.pages.characters.loading_error} />
            </IfRejected>
        </div>

    );


}

export default Characters;