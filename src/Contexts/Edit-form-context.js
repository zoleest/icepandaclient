import React from "react";

export const EditFormDefaults = {
    value: null,
    setValue: () => { }
}



export const EditForm = React.createContext(EditFormDefaults );