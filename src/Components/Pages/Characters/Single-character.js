import axios from "axios";
import {useParams} from 'react-router';

import config from '../../../config.json';
import {useContext} from "react";
import {LanguageData} from "../../../Contexts/Language-context";
import {UserData} from "../../../Contexts/User-context"
import {useAsync, IfFulfilled, IfRejected, IfPending} from "react-async";
import { useNavigate } from "react-router-dom"

import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";

import SingleCharacterSimpleParagraphs from "./Single-character/Single-character-simple-paragraphs";
import SingleCharacterComplexListElements from "./Single-character/Single-character-complex-list-elements";
import SingleCharacterComplexParagraphs from "./Single-character/Single-character-complex-paragraphs";
import SingleCharacterRelationships from "./Single-character/Single-character-relationships";
import SingleCharacterProperties from "./Single-character/Single-character-properties";


async function getCharacterData(props) {
    try{let results = await axios.get(config.server_address + "/characters/" + props.id + "/profile");

        return results.data;

    }catch(error) {

        if (error.response === undefined) throw TypeError("no_connection_error");

        if (error.response.data.error === 'character_not_exist') props.navigate('/');

        throw TypeError(error.response.data.error);
    }




}

function SingleCharacter() {

    let {id} = useParams();
    const {languageData} = useContext(LanguageData);
    const {userData} = useContext(UserData);
    const navigate = useNavigate();

    let state = useAsync({promiseFn: getCharacterData, id: id, navigate: navigate, languageData: languageData});

    return (<div>
            <IfPending state={state}>
                <Loading/>
            </IfPending>
            <IfRejected state={state}>
                {error => <Error
                    value={languageData.errors[error.message] !== undefined ? languageData.errors[error.message] : error.message}/>
                }

            </IfRejected>

            <IfFulfilled state={state}>
                {data => (<div>
                    <div className="row bg-dark bg-opacity-50">
                        <div className="col-2 d-none d-lg-block"></div>
                        <div className="col-12 col-lg-5 text-center px-4 pt-3  bg-dark text-light bg-opacity-75">
                            <h1 className="text-center">
                                {data.character.character_name}
                            </h1>

                            <div className="row">
                                <div className="col-3 d-none d-lg-block"></div>
                                <div className="col-12 col-lg-6">
                                    <img
                                        src={config.server_address + "/images/profile_pictures/" + data.character.character_name_slug + ".webp"}
                                        className="w-75 rounded-circle" alt={data.character.character_name}
                                        title={data.character.character_name_slug}/></div>
                                <h2>{data.character.character_nicknames}</h2>
                                <h3 className="text-warning">{data.character.character_xp} XP</h3>
                                {data.character.character_name_slug === userData.activeCharacter.character_name_slug?<a href={languageData.routes.characters.path + "/" + data.character.character_name_slug  + languageData.routes.characters.subpath.edit}><button className="btn btn-info w-100 mb-3">SZERKESZTÉS</button></a>:""}
                                <div className="col-3 d-none d-lg-block"></div>
                                <div className="text-start ">

                                    {data.fields.filter(field => {
                                        return field.fieldType === 'simple-paragraphs' && !field.fieldFeatured
                                    }).map((key, index) => {
                                        return <SingleCharacterSimpleParagraphs
                                            value={{fieldContent: data.character[key.fieldName], fieldName: key.fieldName}} key={index}/>
                                    })}



                                        {data.fields.filter(field => {
                                            return field.fieldType === 'complex-list-elements'
                                        }).map((item, index) => {



                                           return(<div key={index}> <h3>{languageData.pages.characters.subpage.profile[item.fieldName]}</h3> <ul> { data.character[item.fieldName].map((fieldData, index) =>
                                            { return <SingleCharacterComplexListElements key={index} value={{
                                                    fieldName: fieldData[Object.keys(fieldData)[0]],
                                                    fieldDescription: fieldData[Object.keys(fieldData)[1]]
                                                }}/>
                                            }) }</ul></div>) })}


                                                                      {data.fields.filter(field => {
                                        return field.fieldType === 'complex-paragraphs'
                                    }).map((key, index) => {
                                        return <SingleCharacterComplexParagraphs
                                            value={{fieldContent: data.character[key.fieldName], fieldName: key.fieldName}} key={index}/>
                                    })}

                                </div>
                            </div>

                        </div>
                        <div className="col-12 col-lg-3 text-center px-4 pt-3 bg-dark text-light bg-opacity-75">
                            <h4>
                                {data.character.character_relationships.length !== 0 ? languageData.pages.characters.subpage.profile.character_relationships : ""}
                            </h4>

                            {data.character.character_relationships.map((relationship, index) => {
                                return <SingleCharacterRelationships value={{
                                    name: relationship.partner_name,
                                    slug: relationship.partner_slug,
                                    status: relationship.relationship_status,
                                    custom: relationship.custom
                                }} key={index}/>
                            })}

                            <h4>
                                {data.character.character_properties.length !== 0 ? languageData.pages.characters.subpage.profile.character_properties : ""}
                            </h4>

                            <div className="row ">
                                {data.character.character_properties.map((property, index) => {
                                    return <SingleCharacterProperties
                                        value={{name: property.property_name, id: property.property_id}} key={index}/>
                                })}
                            </div>

                        </div>
                        <div className="col-2 d-none d-lg-block"></div>
                    </div>


                </div>)}
            </IfFulfilled>
        </div>
    );

}

export default SingleCharacter;