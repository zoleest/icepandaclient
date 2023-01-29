import config from "../../../config.json"
import './Home.scss';
import {LanguageData} from "../../../Contexts/Language-context";
import {useContext, useEffect} from "react";
import { Helmet } from 'react-helmet';

function Home(){

    let {languageData} = useContext(LanguageData);

    return(

            <div className="row flex-grow-1">
                <Helmet>
                    <title>{config.site_name + ' - ' + languageData.routes.home.title}</title>
                </Helmet>
                <div
                    className=" px-0 width-100 p-lg-5 col-12 col-lg-8 d-flex d-flex justify-content-lg-start justify-content-center">
                    <main className="p-5 p-lg-3 bg-white frontpage-main w-100 bg-opacity-50">
                        <h1>Üdvözöllek a Szerepjáték.net oldalán!</h1>
                        <img className="align-bottom d-block d-lg-none w-25 mx-auto character"
                             src={config.server_address+"/images/frontpage/sasuke-comm.png"} alt="Sasuke" title="Sasuke"
                             />

                            <p>Unod már a klasszikus régi szerepjáték oldalakat, amik egyáltalán nem motiválnak a
                                játékra?<br/>
                                    <strong>Ennek most vége!</strong> <br/>
                                    Itt a Szerepjáték.net-en elhoztuk azt a rendszert, mely jutalmaz a hűségedért<br/>
                                    Hogy hogyan is néz ki mindez? Tekints bele a videónkba!</p>
                            <div className="justify-content-center d-flex iframe-wrapper">
                                <iframe width="560" height="315"
                                        src="https://www.youtube-nocookie.com/embed/T0Y3P7GMMY4"
                                        title="YouTube video player" frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen></iframe>
                            </div>

                    </main>
                </div>
                <div className="col-lg-4 d-none d-lg-block align-self-end ">
                    <img className="align-bottom character" src={config.server_address+"/images/frontpage/sasuke-comm.png"} alt="Sasuke" title="Sasuke"
                         />
                </div>


            </div>

    );

}

export default Home;