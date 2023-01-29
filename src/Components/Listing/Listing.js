import {useContext} from "react";
import {LanguageData} from "../../Contexts/Language-context";

import ListingTile from "./ListingTile";


function Listing(props){

    const {languageData} = useContext(LanguageData);



    return(


        <div id="charaters-wrapper" className="container-fluid bg-dark bg-gradient">
            <h1 className="text-light text-center pt-3">
                {languageData.pages[props.value.type].heading_text}
            </h1>
            <div className="row justify-content-center">
                {props.value.dataToRender.map((item, index)=>{return <ListingTile value={{data: item, type: props.value.type}} key={index} />})}
            </div>

        </div>
    );


}

export default Listing;