import './App.scss';
import Header from "./Components/Header/Header";
import {BrowserRouter as Router} from 'react-router-dom';
import {useState} from 'react';
import {UserData, UserDataDefaults} from './Contexts/User-context';
import {LanguageData, LanguageDataDefaults} from './Contexts/Language-context';
import language from './Languages/hu-hu.json'

import Content from './Components/Content';
import Login from './Components/Pages/Login/Login'
import Characters from './Components/Pages/Characters/Characters'
import SingleCharacter from './Components/Pages/Characters/Single-character'
import EditCharacter from './Components/Pages/Characters/Edit-character'
import Home from './Components/Pages/Home/Home';
import Locations from './Components/Pages/Locations/Locations';


function App() {

    const [userData, setUserData] = useState(UserDataDefaults.value);
    const [languageData] = useState(LanguageDataDefaults.value);

    const pages = [
        {   /*Home page*/
            name: language.routes.home.title, path:
            language.routes.home.path, element: <Home/>
        },
        {   /*Login page*/
            name: language.routes.login.title, path:
            language.routes.login.path, element: <Login/>
        },
        {   /*All characters*/
            name: language.routes.characters.title, path:
            language.routes.characters.path, element: <Characters/>
        },
        {   /*Character profile*/
            name: language.routes.characters.title,
            path: language.routes.characters.path + '/:id' +  language.routes.characters.subpath.profile,
            element: <SingleCharacter/>
        },
        {   /*Edit profile*/
            name: language.routes.characters.title,
            path: language.routes.characters.path + '/:id' +  language.routes.characters.subpath.edit,
            element: <EditCharacter value={{isEdit: true}}/>
        },
        {   /*New Character*/
            name: language.routes.characters.title,
            path: language.routes.characters.path +  language.routes.characters.subpath.new,
            element: <EditCharacter value={{isEdit: false}}/>
        },

        {   /*Location_list*/
            name: language.routes.locations.title, path:
            language.routes.locations.path + '/:tag/:pg', element: <Locations/>
        }
    ];


    return (

        <LanguageData.Provider value={{languageData}}>
            <UserData.Provider value={{userData, setUserData}}>
                <Router>
                    <div className="App">
                       <Header/>
                        <Content routes={pages}/>
                    </div>
                </Router>
            </UserData.Provider>
        </LanguageData.Provider>
    );
}

export default App;
