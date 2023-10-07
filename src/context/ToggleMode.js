import { createContext, useState } from "react";

export const ToggleModeContext = createContext();

export default function ToggleModeProvider({ children }) {
    const [mode, setMode] = useState(localStorage.getItem("mode") || "dark");
    function changeMode() {
        if (mode === "light") {
            setMode("dark");
            localStorage.setItem("mode", "dark");
        } else {
            setMode("light");
            localStorage.setItem("mode", "light");
        }
    }

    return (
        <ToggleModeContext.Provider value={{mode, setMode, changeMode }}>
            {children}
        </ToggleModeContext.Provider>
    );
}