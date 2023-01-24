import {LanguageData} from "../../../Contexts/Language-context";
import {useContext} from "react";
import parse from 'html-react-parser';

function SingleCharacterComplexListElements(props){

    let {languageData} = useContext(LanguageData);

    return(<li>
        <h5>{props.value.fieldName}</h5>
        <div>{parse(props.value.fieldDescription)}</div>
    </li>);
}
export default SingleCharacterComplexListElements;