"use client";
import React, { useState, useEffect } from "react";
import CompaniesList from "../components/CompanyList";
import { ProjectsProvider } from "../providers/ProjectsProvider";
import { TasksProvider } from "../providers/TasksProvider";
import AllTasks from "../components/tasks/AllTasks";
// import Link from "next/link";

export default function PortalSelector() {
    return (
        <>
            <CompaniesList />
            <TasksProvider>
                <AllTasks />
            </TasksProvider>
        </>
    )
}
