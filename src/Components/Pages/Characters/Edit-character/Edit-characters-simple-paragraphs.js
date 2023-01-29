import {LanguageData} from "../../../../Contexts/Language-context";
import {useContext} from "react";

function EditCharactersSimpleParagraphs(props) {

    let {languageData} = useContext(LanguageData);

    let fieldName = props.value.fieldName.split('_')[1];
    let fieldInputType = props.value.fieldInputType;
    let fieldPreviousValue = props.value.previousValue;

    if ((fieldInputType === "text" || fieldInputType === "date") && (fieldName!=="name"||fieldPreviousValue===undefined)) return (<div className="mt-2">
        <label htmlFor={fieldName}>{languageData.pages.characters.subpage.edit[props.value.fieldName]}</label>
        <input className="form-control mb-2" name={fieldName} id={fieldName} type={fieldInputType} defaultValue={fieldPreviousValue} required={true}/>
    </div>);

    if(fieldInputType === "select")

        return(<div className="mt-2"><label
            htmlFor={fieldName}>{languageData.pages.characters.subpage.edit[props.value.fieldName]}</label>
        <select className="form-select mb-2" name={ fieldName } id={fieldName} required={true} defaultValue={fieldPreviousValue!==undefined?fieldPreviousValue:""}>
            <option hidden disabled value="">{languageData.pages.characters.subpage.edit.choose}</option>
            {props.value.fieldSelectOptions.map((item, index) => {return(<option value={item} key={index}>{languageData.pages.characters.subpage.edit[item]}</option>)})}
        </select></div>);


}

export default EditCharactersSimpleParagraphs;