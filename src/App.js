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



function App() {

    const [userData, setUserData] = useState(UserDataDefaults.value);
    const [languageData, setLanguageData] = useState(LanguageDataDefaults.value);

    const pages = [
        {
            name: language.routes.login.title, path:
            language.routes.login.path, element: <Login/>
        },
        {
            name: language.routes.characters.title, path:
            language.routes.characters.path, element: <Characters/>
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
