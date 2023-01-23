import React from "react";
import language from '../Languages/hu-hu.json';

export const LanguageDataDefaults = {
    value: language,
    setValue: () => { }
}



export const LanguageData = React.createContext(LanguageDataDefaults);