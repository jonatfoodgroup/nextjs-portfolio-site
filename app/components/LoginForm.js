"use client";
import { useAuth } from "../providers/AuthProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { generatePasscode, verifyPasscode, user } = useAuth();
    const [passcode, setPasscode] = useState("");
    const [error, setError] = useState("");
    const [userId, setUserId] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/sandbox");
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
            <input
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="mb-4 border border-gray-300 rounded p-2 w-full"
            />
            <input
                type="text"
                placeholder="Enter your passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mb-4 border border-gray-300 rounded p-2 w-full"
            />
            <button
                className="mb-4"
                onClick={async () => {
                    try {
                        await generatePasscode(userId);
                    } catch (e) {
                        setError(e.message);
                    }
                }}
            >
                Generate passcode
            </button>
            <button
                className="mb-4"
                onClick={async () => {
                    try {
                        await verifyPasscode(userId, passcode);
                    } catch (e) {
                        setError(e.message);
                    }
                }}
            >
                Verify passcode
            </button>
            {error && <p>{error}</p>}
        </div>
    )
}

