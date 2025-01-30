"use client";
import { signIn, signOut, useSession, SessionProvider } from "next-auth/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { UserProvider } from "../../providers/UserProvider";

export default function GettingStarted() {
    return (
        <SessionProvider>
            <UserProvider>
                <div className="bg-black pt-16 pb-36 flex justify-center relative min-h-[50vh]">
                    <div className="flex flex-col w-full max-w-6xl mx-auto text-center items-center justify-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white pointer-events-none">
                            Getting Started
                        </h1>
                        <p className="text-xl text-white mt-4">
                            Welcome to StrongStart! We're thrilled to see what you'll create.
                        </p>
                        <div className="flex mt-8 justify-center items-center space-x-4">
                            <LoginButton />
                        </div>
                    </div>
                    <div className="mt-16">
                        <Content />
                    </div>
                </div>
            </UserProvider>
        </SessionProvider>
    );
}

const Content = () => {

    const { data: session, status } = useSession();

    if (status === "authenticated") {
        return (
            <div className="bg-white py-16 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold">Welcome to StrongStart</h2>
                    <p className="mt-4">
                        StrongStart is a powerful platform for building and managing your projects. With
                        features like task management, chat, and file sharing, you can keep your team
                        organized and focused on what matters most.
                    </p>
                    <h3 className="text-lg font-semibold mt-8">Getting Started</h3>
                    <p className="mt-4">
                        Now that you're authenticated, you can view your projects and tasks, collaborate with your team in Discord, and access all of StrongStart's features.
                    </p>
                    <h3 className="text-lg font-semibold mt-8">Team Structures</h3>
                    <p className="mt-4">
                        StrongStart supports a variety of team structures, including project managers,
                        team members, and clients. Depending on your role, you'll have access to
                        different features and permissions within the platform.
                    </p>
                    <h3 className="text-lg font-semibold mt-8">About Projects</h3>
                    <p className="mt-4">
                        Projects are the heart of StrongStart. They allow you to organize your tasks,
                        files, and conversations in one place. You can create new projects, assign tasks
                        to team members, and track progress with ease.
                    </p>
                    <h3 className="text-lg font-semibold mt-8">Getting Help</h3>
                    <p className="mt-4">
                        If you have any questions or need help getting started, don't hesitate to reach
                        out to our support team. You can contact us via email at{" "}
                    </p>

                    <div className="mt-8">
                        <VerifyReady />
                    </div>
                </div>
            </div>
        );
    }
}

const VerifyReady = () => {
    return (
        <>
            <button 
                onClick={() => signOut()}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-150"
            >
                Verify Ready
            </button>
        </>
   )
}

const LoginButton = () => {
    const { data: session, status } = useSession();
    if (status === "loading") {
        return (
            <div className="text-sm text-gray-400 animate-pulse">
                <Icon icon="akar-icons:circle" className="w-4 h-4" />
            </div>
        );
    }

    if (status === "authenticated") {
        return (
            <button
                className="flex items-center space-x-2 bg-gray-800 rounded-full px-4 py-1 shadow hover:bg-gray-700 focus:outline-none"
            >
                <img
                    src={session?.user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold text-sm text-white">{session?.user.username}</span>
            </button>
        );
    }

    return (
        <>
            <h2 className="text-lg text-white">Sign in with Discord to get started</h2>
            <button
                onClick={() => signIn("discord")}
                className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition duration-150"
            >
                Login
            </button>
        </>
    );
}