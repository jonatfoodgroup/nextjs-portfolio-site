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
        <div>
            <input
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter your passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
            />
            <button
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

