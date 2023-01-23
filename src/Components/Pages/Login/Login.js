import axios from 'axios';
import {useContext} from "react";
import {UserData} from "../../../Contexts/User-context";
import { useNavigate } from "react-router-dom"
import {useState} from 'react';
import {LanguageData} from "../../../Contexts/Language-context";

import config from "../../../config.json";


import './Login.scss';

async function submitLogin(e, userData, setUserData, setErrorData, navigate) {

    e.preventDefault();

    if(userData.loggedIn === undefined) {
        let results = await axios.post(config.server_address +'/login', {
            username: e.target.username.value,
            password: e.target.password.value
        }, {withCredentials: true});


        if(results.data.error === undefined){

             localStorage.setItem('userData', JSON.stringify(results.data));
             setUserData(results.data);
            setErrorData({});

        }else{


            setErrorData({error: results.data.error});

        }


    }else{
        navigate('/');
    }
}


function Login() {



        const {userData, setUserData} = useContext(UserData);
        const [errorData, setErrorData] = useState();
        const {languageData} = useContext(LanguageData);
        const navigate = useNavigate();

        if(!userData.loggedIn){

            return(<div className="container-fluid h-100">
                <div className="row align-items-center h-100 pt-lg-0 pt-5 login-form-container">
                    <div className="col-12 col-lg-3 d-none d-lg-block"></div>
                    <div className="col-12 col-lg-6 align-middle ">
                        <div className="w-100 bg-dark bg-opacity-75 p-3 mx-auto">
                            <h2 className="text-light">
                                {languageData.pages.login.login_text}
                            </h2>
                            <h4 className={errorData=== undefined?'d-none':'d-inline'}> <span className="text-danger">{languageData.pages.login.error}</span><span className="text-light">{errorData!== undefined?errorData.error:""}</span></h4>
                            <form onSubmit={async function(e){submitLogin(e,userData,setUserData, setErrorData, navigate)}} method="post">
                                <input className="form-control mt-3" type="text" name="username"
                                       placeholder={languageData.pages.login.username_placeholder} required />
                                    <input className="form-control mt-3" type="password" name="password"
                                           placeholder={languageData.pages.login.password_placeholder} required />
                                        <input className="btn btn-success mt-3 me-2" type="submit" name="submit" value={languageData.pages.login.submit_button} />
                                            <a href="/lost-password">
                                                <button type="button" className="btn btn-danger mt-3 me-2">
                                                    {languageData.pages.login.forgot_button}
                                                </button>
                                            </a>
                                            <a href="/registration">
                                                <button type="button" className="btn btn-warning mt-3 me-2">
                                                    {languageData.pages.login.registration_button}
                                                </button>
                                            </a>
                            </form>
                        </div>

                    </div>
                    <div className="col-12 col-lg-3 d-none d-lg-block"></div>
                </div>
            </div>);

        }else{

            navigate('/');

        }

}

export default Login;