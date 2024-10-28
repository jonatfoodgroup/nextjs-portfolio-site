"use client";
import React, { useEffect, useContext, createContext, useState } from "react";
import Drawer from "../components/Drawer";

const DrawerContext = createContext();

export const useDrawer = () => {
    return useContext(DrawerContext);
}

const DrawerProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState(null);


    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawer, drawerData, setDrawerData }}>
            {children}
            <Drawer />
        </DrawerContext.Provider>
    );
}

export default DrawerProvider;