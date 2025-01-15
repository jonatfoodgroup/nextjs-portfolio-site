"use client";

import Task from "../components/TaskItem";
import { useFirebase } from "../providers/FirebaseProvider";
import { useState, useMemo } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import TranscriptList from "../components/TranscriptList";
import Select from "react-select";

const categories = ["Research", "Execution", "Planning", "Creation", "Automation/Development"];
const timeframes = [
    { value: "All", label: "All" },
    { value: "Today", label: "Today" },
    { value: "Tomorrow", label: "Tomorrow" },
    { value: "Next Week", label: "Next Week" },
];

const Page = () => {
    const { tasks } = useFirebase();
    const [sortOrder, setSortOrder] = useState("desc"); // Default to "most recent first"
    const [filterCategory, setFilterCategory] = useState("All"); // Default filter to "All"
    const [filterCompany, setFilterCompany] = useState("All"); // Default company filter to "All"
const [timeframeFilter, setTimeframeFilter] = useState("Today");

    // Calculate unique companies with task count
    const companiesWithCount = useMemo(() => {
        const companyCounts = tasks.reduce((acc, task) => {
            if (task.company) {
                acc[task.company] = (acc[task.company] || 0) + 1;
            }
            return acc;
        }, {});
        return [{ company: "All", count: tasks.length }, ...Object.entries(companyCounts).map(([company, count]) => ({ company, count }))];
    }, [tasks]);

    // Function to toggle sort order
    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    const filteredAndSortedTasks = tasks
        ? [...tasks]
            .filter((task) => filterCategory === "All" || task.category === filterCategory)
            .filter((task) => filterCompany === "All" || task.company === filterCompany)
            .filter((task) => timeframeFilter === "All" || task.timeframe === timeframeFilter) // Timeframe filter
            .sort((a, b) => {
                // 1. Move "completed" tasks to the bottom
                if (a.status === "completed" && b.status !== "completed") {
                    return 1; // `a` should come after `b`
                }
                if (a.status !== "completed" && b.status === "completed") {
                    return -1; // `a` should come before `b`
                }

                // 2. Sort by priority: high > medium > low > undefined
                const priorityOrder = { high: 1, medium: 2, low: 3, undefined: 4 };
                const priorityA = priorityOrder[a.priority] || priorityOrder.undefined;
                const priorityB = priorityOrder[b.priority] || priorityOrder.undefined;

                if (priorityA !== priorityB) {
                    return priorityA - priorityB;
                }

                // 3. Sort by timestamp: ascending or descending based on sortOrder
                const dateA = new Date(a.timestamp);
                const dateB = new Date(b.timestamp);
                if (sortOrder === "asc") {
                    return dateA - dateB;
                }
                return dateB - dateA;
            })
        : [];
    // Copy tasks to clipboard
    const copyTasksToClipboard = () => {
        if (!tasks || tasks.length === 0) {
            alert("No tasks available to copy!");
            return;
        }
        const taskText = tasks
            .map((task) => `Task: ${task.task}, Status: ${task.status}, Category: ${task.category}, Company: ${task.company}, Timestamp: ${task.timestamp}`)
            .join("\n");
        navigator.clipboard
            .writeText(taskText)
            .then(() => alert("Tasks copied to clipboard!"))
            .catch(() => alert("Failed to copy tasks to clipboard."));
    };

    return (
        <div className="flex w-full h-screen bg-white">
            {/* Left Panel: Tasks */}
            <div className="w-3/4 flex flex-col items-center">
                <div className="w-full h-screen p-4 overflow-y-auto">
                    <div className="flex items-center justify-between w-full">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks <span className="text-sm text-gray-500">({filteredAndSortedTasks.length})</span></h2>
                        <div className="flex items-center space-x-4">
                            <button onClick={copyTasksToClipboard} className="p-2">
                                <Icon icon="akar-icons:copy" className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                    {/* Filter Dropdowns */}
                    <div className="flex items-center px-2 mb-4 w-full rounded-lg shadow-sm sticky top-0 z-10">
                        <ViewFilters
                            filterCategory={filterCategory}
                            setFilterCategory={setFilterCategory}
                            filterCompany={filterCompany}
                            setFilterCompany={setFilterCompany}
                            timeframeFilter={timeframeFilter}
                            setTimeframeFilter={setTimeframeFilter}
                            companiesWithCount={companiesWithCount}
                            toggleSortOrder={toggleSortOrder}
                            copyTasksToClipboard={copyTasksToClipboard}
                        />
                    </div>

                    {/* Task List */}
                    <div className="w-full px-4">
                        <ul>
                            {filteredAndSortedTasks.map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Right Panel: Transcripts */}
            <div className="w-1/4 flex justify-center items-center bg-light-orange">
                <div className="w-full h-screen p-4 bg-light-orange overflow-y-auto">
                    <TranscriptList />
                </div>
            </div>

            {/* Bottom Bar */}
            <BottomBar />
        </div>
    );
};

const AddTaskFormModal = () => {
    return (
        <>
        </>
    )
}

const ViewFilters = ({
    filterCategory,
    setFilterCategory,
    filterCompany,
    setFilterCompany,
    companiesWithCount,
    timeframeFilter = { timeframeFilter },
    setTimeframeFilter = { setTimeframeFilter },
    toggleSortOrder,
    copyTasksToClipboard,
}) => {
    // Format options for react-select
    const categoryOptions = [
        { value: "All", label: "All" },
        ...categories.map((category) => ({ value: category, label: category })),
    ];

    const companyOptions = companiesWithCount.map(({ company, count }) => ({
        value: company,
        label: `${company} (${count})`,
    }));

    // sort companyOptions alphabetically
    companyOptions.sort((a, b) => a.value.localeCompare(b.value));

    if (companiesWithCount.length === 0) {
        companyOptions.push({ value: "All", label: "All" });
    }

    if (companiesWithCount.length === 0) {
        return (
            <>Loading..</>
        );
    }
    return (
        <div className="flex items-center space-x-4 w-full justify-between py-2 px-4 rounded-lg border border-gray-300 bg-light-orange shadow-sm">
            {/* Company Filter */}
            <div className="flex flex-row w-1/4 items-center space-x-2">
                <label htmlFor="company-filter" className="text-xs font-bold text-gray-600">
                    Company:
                </label>
                <Select
                    options={companyOptions}
                    value={companyOptions.find((option) => option.value === filterCompany)}
                    onChange={(selectedOption) => setFilterCompany(selectedOption.value)}
                    isSearchable
                    className="react-select-container w-full"
                    classNamePrefix="react-select"
                />
            </div>




            {/* Timeframe Filter */}
            <div className="flex flex-row w-1/8 items-center space-x-2">
                <label htmlFor="timeframe-filter" className="text-xs font-bold text-gray-600">
                    Timeframe:
                </label>
                <Select
                    options={timeframes}
                    value={timeframes.find((option) => option.value === timeframeFilter)}
                    onChange={(selectedOption) => setTimeframeFilter(selectedOption.value)}
                    isSearchable={false}
                    className="react-select-container min-w-48"
                    classNamePrefix="react-select"
                />
            </div>
            {/* Category Filter */}
            <div className="flex flex-row w-1/8 items-center space-x-2">
                <label htmlFor="category-filter" className="text-xs font-bold text-gray-600">
                    Category:
                </label>
                <Select
                    options={categoryOptions}
                    value={categoryOptions.find((option) => option.value === filterCategory)}
                    onChange={(selectedOption) => setFilterCategory(selectedOption.value)}
                    isSearchable={false}
                    className="react-select-container min-w-48"
                    classNamePrefix="react-select"
                />
            </div>
            <div className="flex flex-row w-1/4 justify-end">

                {/* Sort Button */}
                <button onClick={toggleSortOrder} className="p-2">
                    <Icon icon="akar-icons:arrow-up-down" className="w-6 h-6" />
                </button>

                {/* Copy Button */}
                <button onClick={copyTasksToClipboard} className="p-2">
                    <Icon icon="akar-icons:copy" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

const BottomBar = () => {
    return (
        <div className="flex items-center justify-between bg-white p-4 shadow-sm fixed bottom-0 w-full">
            <div className="flex items-center space-x-2">
                <div className='flex items-center justify-center w-8 h-8 bg-orange rounded-full'>
                    <Icon icon="carbon:infinity-symbol" className="text-2xl text-white" />
                </div>
                <h2 className="text-xl -mt-1 font-extrabold flex items-center text-black">strongstart</h2>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="carbon:search" className="w-6 h-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="carbon:bookmark" className="w-6 h-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="carbon:notification" className="w-6 h-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="carbon:user-avatar" className="w-6 h-6" />
                </button>
                <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="carbon:chat" className="w-6 h-6" />
                </button>
            </div>
        </div>
    )
}

export default Page;