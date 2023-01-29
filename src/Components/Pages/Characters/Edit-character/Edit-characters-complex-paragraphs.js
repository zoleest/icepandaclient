import {LanguageData} from "../../../../Contexts/Language-context";
import {useContext, useRef} from "react";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function EditCharactersSimpleParagraphs(props) {

    let {languageData} = useContext(LanguageData);

    let fieldName = props.value.item.fieldName.split('_')[1];
    let fieldPreviousValue = props.value.item.previousValue;

    const ref = useRef(null);

    return (<div className="mt-3 "><label
        htmlFor={fieldName}>{languageData.pages.characters.subpage.edit[props.value.item.fieldName]}</label>
        <textarea className="d-none" name={fieldName} ref={ref} defaultValue={fieldPreviousValue} required={true}></textarea>
        <CKEditor
            editor={ ClassicEditor }
            data={fieldPreviousValue}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                ref.current.textContent = data;
                props.value.update();
            } }
            />
    </div>)


}

export default EditCharactersSimpleParagraphs;