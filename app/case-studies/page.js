"use client";
import React, { useState, useEffect } from "react";
import CaseStudiesList from "../components/CaseStudiesList";
import Header from "../components/Header";

export default function CaseStudies() {
    const [passcode, setPasscode] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passcode === "1234") {
            setLoggedIn(true);
        }
    }

    if (!loggedIn) {
        return (
            <div className="h-screen flex items-center justify-center">
                <LoginForm
                    handleLogin={handleLogin}
                    passcode={passcode}
                    setPasscode={setPasscode}
                />
            </div>
        );
    }
    return (
        <>
            <Header />
            <div className="container mx-auto pt-36">
                <h1 className="text-4xl font-bold text-text mb-10">Case Studies</h1>
                <CaseStudiesList />
            </div>
        </>
    );
}

const LoginForm = ({
    handleLogin,
    passcode,
    setPasscode,
}) => {
    return (
        <form onSubmit={handleLogin} className="flex flex-col">
            <h2 className="text-2xl font-bold text-text mb-4">Login</h2>
            <input
                placeholder="Enter passcode"
                type="password"
                className="p-2 border border-gray-300 rounded"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white p-2 rounded mt-2"
                type="submit">Login</button>
        </form>
    );
}