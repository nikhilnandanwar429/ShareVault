import { createContext, useContext, useState } from "react";

// Create context with default values
export const FileContext = createContext({
    fileType: "Text",
    changeFileType: () => { }
});


// Custom hook for using the context
export function useFileType() {
    const context = useContext(FileContext);
    if (context === undefined) {
        throw new Error("useFileType must be used within a FileTypeProvider");
    }
    return context;
}