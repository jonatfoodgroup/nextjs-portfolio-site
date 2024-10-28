"use client";
import React from "react";
import { useDrawer } from "../providers/DrawerProvider";
const Drawer = () => {
    const { drawerData } = useDrawer();

    if (!drawerData) {
        return null;
        }

    return (
      <div
        className="fixed top-0 right-0 h-full w-1/2  shadow-lg p-8"
        id="drawer"
      >
        <h2 className="text-3xl font-semibold">{drawerData.title}</h2>
      </div>
    );
  };

export default Drawer;