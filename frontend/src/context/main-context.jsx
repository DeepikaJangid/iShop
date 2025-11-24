"use client"
import React, { createContext } from 'react'
const Context = createContext();

export default function MainContext({ children }) {
    const [menu, setMenu] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const HamburgerMenuHandler = () => {
        setMenu(!menu);
    }

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <Context.Provider value={{ menu, HamburgerMenuHandler, showPassword, togglePassword }}>
            {children}
        </Context.Provider>
    )
}

export { Context }