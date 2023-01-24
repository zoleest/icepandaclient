import {useContext} from "react";
import {LanguageData} from "../../../Contexts/Language-context";

function SingleCharacterRelationships(props){

    let {languageData} = useContext(LanguageData);

    return(<h5>
        <a href={languageData.routes.characters.path +  "/" + props.value.slug + languageData.routes.characters.subpath.profile }>
            {props.value.name} - {props.value.status !== 'custom' ? props.value.status : props.value.custom}
        </a>
    </h5>)
}
export default SingleCharacterRelationships;