import {LanguageData} from "../../../../Contexts/Language-context";
import {useContext} from "react";

function SingleCharacterSimpleParagraphs(props){

    let {languageData} = useContext(LanguageData);

    return(<div>
        <h4>{languageData.pages.characters.subpage.profile[props.value.fieldName]}</h4>
        <p>{languageData.pages.characters.subpage.profile[props.value.fieldContent]!==undefined? languageData.pages.characters.subpage.profile[props.value.fieldContent]: props.value.fieldContent }</p>
    </div>);
}
export default SingleCharacterSimpleParagraphs;