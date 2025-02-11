"use client";
import React, { useState, useEffect, use } from "react";
import { useHubspot } from "../../providers/HubspotProvider";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ProjectsProvider } from "../../providers/ProjectsProvider";
import ProjectsList from "../projects/ProjectsList";

const Sidebar = ({
    showSidebar
}) => {
    return (
        <aside className={`w-0 bg-black text-white h-screen fixed top-0 bottom-0 left-0 overflow-y-auto pt-16 transition-all duration-300 ${showSidebar ? "w-64" : "w-0"}`}>
            <Projects />
        </aside>
    );
};

const Projects = () => {
    const { companies } = useHubspot();
    const [openClients, setOpenClients] = useState({});
    const [clients, setClients] = useState([]);

    useEffect(() => {
        if (companies.length) {

            // sort companies by name
            const companiesSorted = companies.sort((a, b) => {
                if (a.properties.name < b.properties.name) {
                    return -1;
                }
                if (a.properties.name > b.properties.name) {
                    return 1;
                }
                return 0;
            });

            setClients(companiesSorted);
        }
    });

    // cmd + k to open
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "k" && e.metaKey) {
                setOpenClients((prev) => ({
                    ...prev,
                    [clients[0].id]: true,
                }));
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [clients]);



    const toggleClient = (clientId) => {
        setOpenClients((prev) => ({
            ...prev,
            [clientId]: !prev[clientId],
        }));
    };

    if (!clients.length) {
        return null;
    }
    return (
        <>
            <ul className="space-y-2 mt-2">
                {clients.map((client) => (
                    <li key={client.id} className="whitespace-nowrap">
                        <div
                            onClick={() => toggleClient(client.id)}
                            className="flex justify-start text-sm font-bold items-center p-3 cursor-pointer text-gray-400 hover:bg-gray-700 space-x-1"
                        >
                            <span
                                className="text-gray-400 text-sm"
                            >{openClients[client.id] ? <Icon icon="akar-icons:chevron-down" className="w-4" /> : <Icon icon="akar-icons:chevron-right" className="w-4" />}</span>
                            <span>{client.properties.name}</span>

                            
                            
                        </div>
                        <div className="border-l-2 border-gray-800 pl-4">
                            {openClients[client.id] && (
                                <ProjectsProvider hubspotId={client.id}>
                                    <ProjectsList />
                                </ProjectsProvider>
                            )}                      
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
};


export default Sidebar;