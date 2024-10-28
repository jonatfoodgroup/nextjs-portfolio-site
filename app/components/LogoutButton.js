"use client";
import { useAuth } from "../providers/AuthProvider";

export default function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button onClick={() => logout()}>Logout</button>
    );
}