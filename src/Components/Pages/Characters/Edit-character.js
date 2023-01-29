import {useAsync, IfFulfilled, IfRejected, IfPending} from "react-async";
import {useNavigate} from "react-router-dom"
import {useParams} from 'react-router';
import config from '../../../config.json';
import axios from "axios";
import {useContext, useRef, useState} from "react";

import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import EditCharactersSimpleParagraphs from "./Edit-character/Edit-characters-simple-paragraphs";
import {LanguageData} from "../../../Contexts/Language-context";
import {UserData} from "../../../Contexts/User-context";
import EditCharactersComplexParagraphs from "./Edit-character/Edit-characters-complex-paragraphs";
import EditCharactersComplexListElements from "./Edit-character/Edit-characters-complex-list-elements";
import './Characters.scss';
import ProfilePictureEditor from "./Edit-character/Profile-picture-editor";

async function getFieldsAndData(props) {

    if (!props.userData.loggedIn) props.navigate('/');

    try {
        let results = await axios.get(config.server_address + (props.edit ? ("/characters/" + props.id + "/edit") : ("/characters/new")), {withCredentials: true});


        return results.data;


    } catch (error) {

        if (error.response === undefined) throw TypeError("no_connection_error");

        if (error.response.data.error === 'user_has_no_permission' || error.response.data.error === 'user_not_logged_in') props.navigate('/');

        throw TypeError(error.response.data.error);
    }

}

function getFormData(target, type) {

    let inputs = document.querySelectorAll("#" + target + " " + type);
    let valuesOfType = []

    for (let inputsIteral = 0; inputsIteral < inputs.length; inputsIteral++) {


        if ((inputs[inputsIteral].name !== "")) {
            let object = {};
            object[inputs[inputsIteral].name] = inputs[inputsIteral].value;
            valuesOfType.push(object);
        }

        //  formData.push(actualInputObject)


    }

    return valuesOfType;

}

function EditCharacter(props) {

    let {id} = useParams();
    let {languageData} = useContext(LanguageData);
    let {userData} = useContext(UserData);
    let navigate = useNavigate();
    let state = useAsync({
        promiseFn: getFieldsAndData,
        id: id,
        edit: props.value.isEdit,
        navigate: navigate,
        userData: userData
    })
    let errorRef = useRef(null);
    const [isCropped, setCropped] = useState(false);
    const [isEditing, setIsEditing] = useState(id === undefined);

    function checkForm() {


        let inputs = document.querySelectorAll('[required]');
        let isAllFilled = true;


        for (let inputIteral = 0; inputIteral < inputs.length; inputIteral++) {

            if (inputs[inputIteral].nodeName !== "TEXTAREA") {
                if (inputs[inputIteral].value === "") {
                    isAllFilled = false;
                    break;
                }

            } else {
                if (inputs[inputIteral].textContent === "") {
                    isAllFilled = false;
                    break;
                }
            }
        }

        if (isAllFilled && isCropped) {
            setIsEditing(false);
        }


    }


    async function submitForm(event) {

        event.preventDefault();

        let formData = [];


        formData = getFormData(event.target.id, 'input').concat(getFormData(event.target.id, 'select'), getFormData(event.target.id, 'textarea'));
        let Json = {};

        for (let formDataIteral = 0; formDataIteral < formData.length; formDataIteral++) {

            let key = Object.keys(formData[formDataIteral])[0];

            Json[key] = formData[formDataIteral][key];

        }

        try {
            let results = await axios.post(config.server_address + (props.edit ? ("/characters/" + props.id + "/edit") : ("/characters/new")), {Json}, {withCredentials: true});


            navigate(languageData.routes.characters.path + "/" + results.data.redirectTo + languageData.routes.characters.subpath.profile);

        } catch (error) {

            if (error.response === undefined) errorRef.current.innerText = languageData.misc.error + ": " + languageData.errors["no_connection_error"];

            if (error.response.data.error === 'user_has_no_permission' || error.response.data.error === 'user_not_logged_in') props.navigate('/');


            errorRef.current.innerText = languageData.misc.error + ": " + languageData.errors[error.response.data.error];
        }


    }

    function openNewWeapon(event, fieldName){
        document.querySelector("." + fieldName + "-div.d-none").classList.remove('d-none');
        if(document.querySelector("." + fieldName + "-div.d-none") === null){
            event.target.disabled = true;
            event.target.classList.add('d-none');
        }
    }

    if(userData.activeCharacter!==undefined&&userData.activeCharacter.character_name_slug !== id){
        navigate('/');
    }

    return (
        <div>
            <IfPending state={state}>
                <Loading/>
            </IfPending>
            <IfRejected state={state}>
                {error => <Error
                    value={languageData.errors[error.message] !== undefined ? languageData.errors[error.message] : error.message}/>
                }

            </IfRejected>

            <IfFulfilled state={state}>

                {data => <div className="container-fluid">

                    <div className="row">
                        <div className="col-12 col-lg-6 p-3 bg-light bg-opacity-75">
                            <h2 className="text-danger">
                            </h2>
                            <form method="POST" id="edit_form" onChange={checkForm} onSubmit={submitForm}>
                                <h2 className="text-center">{languageData.pages.characters.subpage.edit.character_profile_picture}</h2>
                                <ProfilePictureEditor value={{slug: data.slug, state: {isCropped, setCropped}}}/>
                                {data.fields.filter(field => {
                                    return field.fieldType === 'simple-paragraphs'
                                }).map((item, index) => {
                                    return <EditCharactersSimpleParagraphs
                                        value={item} key={index}/>
                                })}

                                <hr/>

                                {data.fields.filter(field => {
                                    return field.fieldType === 'complex-list-elements'
                                }).map((item, index) => {


                                    return (<div key={index} className="mt-3">
                                            <h3>{languageData.pages.characters.subpage.edit[item.fieldName]}</h3>
                                            <div id={item.fieldName.split('_')[1] + "-wrapper"}>
                                                {Array.from({length: config.weapons_and_abilities_max_count}, (_, k) => (

                                                    <EditCharactersComplexListElements key={k} value={{
                                                        fieldSingular: item.fieldSingular,
                                                        fieldGroupName: item.fieldName.split('_')[1],
                                                        fieldName: item.fieldSingular + "_name",
                                                        fieldDescription: item.fieldSingular + "_description",
                                                        fieldPreviousValue: item.previousValue !== undefined ? item.previousValue[k] : undefined,
                                                        fieldNumber: k
                                                    }}/>))}
                                            </div>
                                            <button type="button" className="btn btn-info w-100 mt-2" onClick={(event) => openNewWeapon(event, item.fieldName.split('_')[1])}>Új mező
                                                felétele
                                            </button>
                                        </div>
                                    )


                                })}

                                <hr/>

                                {data.fields.filter(field => {
                                    return field.fieldType === 'complex-paragraphs'
                                }).map((item, index) => {
                                    return <EditCharactersComplexParagraphs
                                        value={{item: item, update: checkForm}} key={index}/>
                                })}
                                <div className="text-danger h3" ref={errorRef}></div>
                                <input type="submit" disabled={isEditing} className="mt-2"/>
                            </form>

                        </div>

                    </div>
                </div>}
            </IfFulfilled>
        </div>

    );


}

export default EditCharacter;