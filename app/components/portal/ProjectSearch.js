"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useHubspot } from "../../providers/HubspotProvider";

const ProjectSearch = () => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const { companies, loading, error } = useHubspot();

    useEffect(() => {
        if (loading) return;
        fetch("/api/projects/get-projects")
            .then((res) => res.json())
            .then((data) => {
                // loop over projects and attach the company name to each project by matching the hubspotId
                const projectsWithCompany = data.map((project) => {
                    const company = companies.find(
                        (company) => company.id === project.hubspotId
                    );
                    return { ...project, company };
                });

                // sort by title
                projectsWithCompany.sort((a, b) => a.title.localeCompare(b.title));
                console.log(projectsWithCompany);
                setProjects(projectsWithCompany);
            })

    }, [companies]);

    const handleSearch = () => {
        setFilteredProjects(
            projects.filter((project) =>
                project.title.toLowerCase().includes(search.toLowerCase()) ||
                project.jobNumber.slice(-5).includes(search) || project.company.properties.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            handleSearch();
        }, 300);

        return () => clearTimeout(debounce);
    }, [search]);

    // Close the dropdown when clicking outside of the search input
    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setFilteredProjects([]);
            }
        };

        document.addEventListener("click", handleClick);

        return () => document.removeEventListener("click", handleClick);
    }, []);

    // Close the dropdown when the search input is empty
    useEffect(() => {
        if (search === "") {
            setFilteredProjects([]);
        }
    }, [search]);

    // If a user presses cmd+k or ctrl+k, focus the search input
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
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                ref={searchRef}
                placeholder={`Use "cmd+k" to search`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                // when text is removed from the input, clear the search
                className="border border-gray-600 text-center rounded px-4 py-2 w-full bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {filteredProjects.length > 0 && (
                <div className="absolute top-full left-0 w-full bg-gray-800 border border-gray-500 rounded mt-2 z-10 bg-gray-800 text-gray-300 shadow-lg">
                    {filteredProjects.map((project) => (
                        <Link key={project.id} href={`/portal/${project.hubspotId}/projects/${project.id}`} className="block px-4 py-2 hover:bg-gray-700 items-center">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{project.title}</span>
                                    <div className="text-sm text-gray-400">{project.company.properties.name}</div>
                                </div>
                                <span className="text-xs text-gray-400">#{project.jobNumber.slice(-5)}</span>
                            </div>

                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectSearch;