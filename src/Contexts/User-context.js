import React from "react";

export const UserDataDefaults = {
    value: JSON.parse(localStorage.getItem('userData'))!==null?JSON.parse(localStorage.getItem('userData')): {},
    setValue: () => { }
}



export const UserData = React.createContext(UserDataDefaults);