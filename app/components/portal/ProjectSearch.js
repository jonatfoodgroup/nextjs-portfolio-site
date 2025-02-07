"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useHubspot } from "../../providers/HubspotProvider";

const ProjectSearch = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const { companies, loading } = useHubspot();

    useEffect(() => {
        if (loading) return;
        fetch("/api/projects/get-projects")
            .then((res) => res.json())
            .then((data) => {
                let projectsWithCompany = data.map((project) => {
                    const company = companies.find(
                        (company) => company.id === project.hubspotId
                    );
                    return { ...project, company };
                });

                projectsWithCompany = projectsWithCompany.filter(
                    (project) => project.title && project.company
                );

                projectsWithCompany = projectsWithCompany.map((project) => ({
                    ...project,
                    jobNumber: project.jobNumber || project.id
                }));

                setProjects(projectsWithCompany);
            });
    }, [companies]);

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (!search) {
                setFilteredProjects([]);
                return;
            }
            const filtered = projects.filter((project) =>
                project.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProjects(filtered);
        }, 300);

        return () => clearTimeout(debounce);
    }, [search, projects]);

    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setFilteredProjects([]);
            }
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                searchRef.current.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative w-full max-w-md mx-auto hidden md:block">
            <input
                type="text"
                ref={searchRef}
                placeholder={`Use "cmd+k" to search`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border border-gray-600 text-center rounded px-4 py-2 w-full bg-transparent 
                           text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:shadow-[0_0_15px_rgba(0,140,255,0.7)] transition-all text-sm"
            />
            {filteredProjects.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-800 border border-gray-500 rounded mt-2 z-10 text-gray-300 shadow-lg">
                    {filteredProjects.map((project) => (
                        <Link
                            key={project.id}
                            href={`/portal/${project.hubspotId}/projects/${project.id}`}
                            className="block px-4 py-2 hover:bg-gray-700 items-center"
                            onClick={() => {
                                setSearch(""); // Clear search input
                                setFilteredProjects([]); // Close dropdown
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{project.title}</span>
                                    <div className="text-sm text-gray-400">
                                        {project.company.properties.name}
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">#{project.jobNumber.slice(-5)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectSearch;