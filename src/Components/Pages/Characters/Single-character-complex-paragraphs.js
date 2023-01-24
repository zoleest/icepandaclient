import {LanguageData} from "../../../Contexts/Language-context";
import {useContext} from "react";
import parse from 'html-react-parser';

function SingleCharacterComplexParagraphs(props){

    let {languageData} = useContext(LanguageData);

    return(<div>
        <h4>{languageData.pages.characters.subpage.profile[props.value.fieldName]}</h4>
        <div>{parse(props.value.fieldContent)}</div>
    </div>);
}

export default SingleCharacterComplexParagraphs;