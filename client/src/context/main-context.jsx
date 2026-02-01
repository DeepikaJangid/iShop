"use client"
import React, { createContext } from 'react'
const Context = createContext();

export default function MainContext({ children }) {
    const [menu, setMenu] = React.useState(false);
    const [showPassword, setPassword] = React.useState(false);
    const [showConfirmPassword, setConfirmPassword] = React.useState(false);

    const HamburgerMenuHandler = () => {
        setMenu(!menu);
    }

    const togglePassword = () => {
        setPassword(!showPassword);
    }

    const toggleConfirmPassword = () => {
        setConfirmPassword(!showConfirmPassword)
    }

    return (
        <Context.Provider value={{ menu, HamburgerMenuHandler, showPassword, togglePassword, showConfirmPassword, toggleConfirmPassword }}>
            {children}
        </Context.Provider>
    )
}

export { Context }