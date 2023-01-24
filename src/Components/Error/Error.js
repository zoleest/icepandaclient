import {LanguageData} from "../../Contexts/Language-context";
import {useContext} from "react";

function Error(props) {

    const {languageData} = useContext(LanguageData);

    return (
        <div className="Error bg-dark">
            <h2 className="text-center  text-danger">{languageData.misc.error}!</h2><h3
            className="text-center  text-light">{props.value} </h3></div>
    );

}
;
export default Error;