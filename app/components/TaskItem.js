"use client";

import { useState, useEffect } from "react";
import { useFirebase } from "../providers/FirebaseProvider";
import { useHubspot } from "../providers/HubspotProvider";
import { Icon } from "@iconify/react/dist/iconify.js";
import Select from "react-select";



const Task = ({ task, categories }) => {
  const [isActive, setIsActive] = useState(false);
  const { updateTask, deleteTask } = useFirebase();
  const [editedTaskText, setEditedTaskText] = useState(task.task);
  const [debouncedTaskText, setDebouncedTaskText] = useState(task.task);
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");
  const [selectedCategory, setSelectedCategory] = useState(task.category || "");
  const [selectedCompany, setSelectedCompany] = useState(task.company || "");
  const [timeframe, setTimeframe] = useState(task.timeframe || "");

  // Debouncing logic for text updates
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedTaskText !== task.task) {
        updateTask(task.id, { task: debouncedTaskText });
      }
    }, 500); // Delay of 500ms

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types again before the delay
    };
  }, [debouncedTaskText, task.id, task.task, updateTask]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setEditedTaskText(newText);
    setDebouncedTaskText(newText);
  };

  const handleCheckboxChange = async (e) => {
    const newStatus = e.target.checked ? "completed" : "pending";
    // also add a timestamp for when the task was completed
    setIsCompleted(e.target.checked);
    await updateTask(task.id, { status: newStatus, completedAt: newStatus === "completed" ? new Date().toISOString() : null });
  };

  const handleCategoryChange = async (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    await updateTask(task.id, { category: newCategory });
  };

  return (
    <div className={`flex items-center space-x-2 border shadow-sm hover:shadow-md transition-all duration-200 border-gray-200
     mb-1 px-2 py-1 ${isCompleted ? "opacity-60" : ""} ${isActive ? "bg-light-orange" : "bg-white"}`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleCheckboxChange}
        className="form-checkbox h-6 w-6 text-blue-600"
      />

      {
        !isCompleted ? (
          <Timer task={task} isActive={isActive} setIsActive={setIsActive} />
        ) : <span className="w-6"></span>
      }
      

      {/* Company Dropdown */}
      <CompanyDropdown
        task={task}
        selectedCompany={selectedCompany}
        setSelectedCompany={setSelectedCompany}
        updateTask={updateTask}
      />



      {/* Editable input or static text based on completion */}
      {isCompleted ? (
        <p className="line-through text-gray-500 w-full">{editedTaskText}</p>
      ) : (
        <input
          type="text"
          value={editedTaskText}
          onChange={handleTextChange}
          className="rounded p-1 w-full font-medium text-md bg-transparent"
        />
      )}

      
      {/* Priority Dropdown */}
      {/* <PriorityDropdown task={task} updateTask={updateTask} /> */}

      {/* Category Dropdown */}
      {/* <CategoryDropdown
        selectedCategory={selectedCategory}
        setSelectedCategory={(newCategory) => {
          setSelectedCategory(newCategory);
          updateTask(task.id, { category: newCategory });
        }}
      /> */}

      {/* Timeframe Dropdown */}
      <TimeframeDropdown
        task={task}
        timeframe={timeframe}
        setTimeframe={setTimeframe}
        updateTask={updateTask}
      />
      {/* Delete button */}
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-300 hover:text-red-700"
      >
        <Icon icon="akar-icons:trash-can" className="w-4 h-4" />
      </button>
    </div>
  );
};

const PriorityDropdown = ({ task, updateTask }) => {
  const priorities = [
    { value: "high", color: "bg-red-200" },
    { value: "medium", color: "bg-orange-200" },
    { value: "low", color: "bg-gray-200" },
    
    
  ];

  return (
    <select
      value={task.priority}
      onChange={(e) => updateTask(task.id, { priority: e.target.value })}
      className="rounded p-1 text-sm"
    >
      {priorities.map((priority) => (
        <option key={priority.value} value={priority.value} className={priority.color}>
          {priority.value.charAt(0).toUpperCase() + priority.value.slice(1)}
        </option>
      ))}
    </select>
  );
};

const CategoryDropdown = ({  selectedCategory, setSelectedCategory }) => {
  const categories = ["Research", "Execution", "Planning", "Creation", "Automation/Development"];
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="rounded p-1 text-sm"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

const CompanyDropdown = ({ task, selectedCompany, setSelectedCompany, updateTask }) => {
  const { companies } = useHubspot();

  // Format the options for react-select
  const companyOptions = companies.map((company) => ({
    value: company.properties.name,
    label: company.properties.name,
  }));

  const handleCompanyChange = async (selectedOption) => {
    const newCompany = selectedOption ? selectedOption.value : "";
    setSelectedCompany(newCompany);
    await updateTask(task.id, { company: newCompany });
  };

  return (
    <Select
      options={companyOptions} // Options for the dropdown
      value={companyOptions.find((option) => option.value === selectedCompany)} // Set the current value
      onChange={handleCompanyChange} // Handle selection changes
      placeholder="Select a company"
      className="react-select-container min-w-48 font-bold"
      classNamePrefix="react-select"
      isDisabled={task.isCompleted} // Disable the dropdown if the task is completed
      isClearable // Allow clearing the selection
      isSearchable // Allow searching within the dropdown
    />
  );
};

const TimeframeDropdown = ({ task, timeframe, setTimeframe, updateTask }) => {
  const timeframes = [
    { value: "Today", label: "Today" },
    { value: "Tomorrow", label: "Tomorrow" },
    { value: "Next Week", label: "Next Week" },
  ];

  const handleTimeframeChange = async (selectedOption) => {
    const newTimeframe = selectedOption ? selectedOption.value : "";
    setTimeframe(newTimeframe);
    await updateTask(task.id, { timeframe: newTimeframe });
  };

  return (
    <Select
      options={timeframes} // Timeframe options
      value={timeframes.find((option) => option.value === timeframe)} // Current value
      onChange={handleTimeframeChange} // Handle selection changes
      placeholder="Set Timeframe"
      className="react-select-container min-w-64 font-semibold"
      classNamePrefix="react-select"
      isClearable // Allow clearing the selection
    />
  );
};

const Timer = ({ task, isActive, setIsActive }) => {
  const [seconds, setSeconds] = useState(0);
  

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {
        isActive ? (
          <button onClick={handlePause} className="border rounded p-1 text-sm bg-orange text-white">
            <Icon icon="carbon:pause" className="w-4 h-4" />
          </button>
        ) : (
          <button onClick={handleStart} className="border rounded p-1 text-sm border-gray-300">
            <Icon icon="carbon:play" className="w-4 h-4" />
          </button>
        )
      }
    </div>
  );
}

export default Task;