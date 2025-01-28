import React, { useState } from "react";
import { FileContext } from "./fileType";
// Create a provider component
export function FileTypeProvider({ children }) {
    const [fileType, setFileType] = useState("Text");

    const changeFileType = (newType) => {
        setFileType(newType);
    };

    return (
        <FileContext.Provider value={{
            fileType,
            changeFileType
        }}>
            {children}
        </FileContext.Provider>
    );
}