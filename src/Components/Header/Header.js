import './Header.scss';
import axios from "axios";
import {useContext} from "react";
import {UserData} from "../../Contexts/User-context";
import {LanguageData} from "../../Contexts/Language-context";


async function setCharacter(slug, userData, setUserData) {

    let response = await axios.post('http://localhost:3000/characters/mine', {character: slug}, {withCredentials: true});


    if(response.data.success !== undefined && response.data.success === true){
        let newUserData = {...userData, activeCharacter : userData.charactersData.filter(obj=>{return obj.character_name_slug === slug})[0]};

     localStorage.setItem('userData',JSON.stringify(newUserData));
       setUserData(newUserData);
    }
}

async function deleteSession(setUserData){

    let response = await axios.get('http://localhost:3000/logout', {withCredentials: true});

    if(response.data.success){

        localStorage.removeItem('userData');
        setUserData({});
    }

}

function createCharactersButton(data, userData, setUserData, languageData) {



    if (data.error !== undefined || data.charactersData === undefined) {

        return (<li className="nav-item" ><a className="nav-link" aria-current="page" href={languageData.routes.characters.path}>{languageData.header.characters}</a></li>);
    } else {
        return (<li className="nav-item dropdown" >
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
               aria-expanded="false">
                {languageData.header.characters}
            </a>
            <ul className="characters-dropdown dropdown-menu">
                {data.charactersData.map((character, index) => {
                    return <li key={index}
                    ><a className={(character.character_name_slug===userData.activeCharacter.character_name_slug?'text-danger':'') + " dropdown-item"} href={languageData.routes.characters.path + "/" + character.character_name_slug+ languageData.routes.characters.subpath.profile} >{character.character_name}</a> <span className="pe-2 align-middle pt-1 text-success" onClick={(event)=>{event.stopPropagation();setCharacter(character.character_name_slug, userData, setUserData)}}>&#10148;</span></li>
                })}
                <li>
                    <hr className="dropdown-divider"/>
                </li>
                <li> <a href={languageData.routes.characters.path} className="dropdown-item">Összes karakter</a></li>
            </ul>
        </li>);
    }

}

function createLoginLogoutButton(userData, setUserData, languageData){

    if(userData.loggedIn){
        return(<li className="nav-item"><a className="nav-link link-danger" href="#" onClick={async function(){deleteSession(setUserData)}}>{languageData.header.logout}</a></li>);
    }else{
        return(<li className="nav-item"><a className="nav-link link-danger" href={languageData.routes.login.path}>{languageData.header.login}</a></li>);
    }
}

function Header() {


    const {userData, setUserData} = useContext(UserData);
    const {languageData} = useContext(LanguageData);

        return (
            <div className="header">
                <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Szerepjáték.net</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#mainNavbar" aria-controls="mainNavbar"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="mainNavbar">
                            <div className="navbar-nav">

                                <ul className="navbar-nav">
                                <li className="nav-item"> <a className="nav-link active" aria-current="page" href="/">{languageData.header.home}</a></li>
                                <li className="nav-item"><a className="nav-link" href="#">{languageData.header.message_wall}</a></li>
                                    {createCharactersButton(userData || {error: "user_not_logged_in"}, userData, setUserData, languageData)}
                                    <li className="nav-item dropdown" >
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                           aria-expanded="false">
                                            {languageData.header.locations}
                                        </a>
                                        <ul className="characters-dropdown dropdown-menu">

                                            <li> <a href={languageData.routes.locations.path + languageData.routes.locations.subpath.public + "/1/"} className="dropdown-item">Publikus helyszínek</a></li>
                                            <li> <a href={languageData.routes.locations.path + languageData.routes.locations.subpath.homes + "/1/"} className="dropdown-item">Otthonok</a></li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li> <a href={languageData.routes.locations.path + languageData.routes.locations.subpath.private + "/1/"} className="dropdown-item">Privát helyszínek</a></li>

                                        </ul>
                                    </li>

                                    {createLoginLogoutButton(userData, setUserData, languageData)}


                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );

}

export default Header;