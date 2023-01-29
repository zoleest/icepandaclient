import {LanguageData} from "../../../../Contexts/Language-context";
import {useContext, useRef} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function EditCharactersComplexListElements(props) {


    let {languageData} = useContext(LanguageData);

    let fieldName = props.value.fieldName.split('_')[1];
    let fieldGroupName = props.value.fieldGroupName;
    let fieldsPreviousValue = props.value.fieldPreviousValue;
    let fieldSingular = props.value.fieldSingular;


    const ref = useRef(null);

    return (<div className={"mt-3 " + fieldGroupName + "-div " + (fieldsPreviousValue!==undefined?"d-block":"d-none")}><label
        htmlFor={fieldName}>{languageData.pages.characters.subpage.edit[props.value.fieldName]}</label>
        <input className="form-control mt-2" name={props.value.fieldName + "_" + props.value.fieldNumber } defaultValue={fieldsPreviousValue!==undefined?fieldsPreviousValue[fieldSingular+"_name"]:""}/>
        <textarea className="d-none" name={props.value.fieldDescription + "_" + props.value.fieldNumber } ref={ref} defaultValue={fieldsPreviousValue!==undefined?fieldsPreviousValue[fieldSingular+"_description"]:""}></textarea>
        <label
        htmlFor={props.value.fieldDescription}>{languageData.pages.characters.subpage.edit[props.value.fieldDescription]}</label>

    <CKEditor
            editor={ ClassicEditor }
            data = {fieldsPreviousValue!==undefined?fieldsPreviousValue[fieldSingular+"_description"]:""}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                ref.current.textContent = data;
            } }
        />
    </div>)

}

export default EditCharactersComplexListElements;