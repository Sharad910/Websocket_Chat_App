import {  createContext,useState } from "react";

export const username_data=createContext(null);

function Context({children}){
    const[userName,setUserName]=useState("");
    return(
        <username_data.Provider value={{userName,setUserName}}>
            {children}
        </username_data.Provider>
    )
}
export default Context