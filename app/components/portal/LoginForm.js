"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = async () => {
    await signIn("discord", { callbackUrl: "/dashboard" });
  };

  const handleLogout = async () => {
    await signOut();
    router.refresh(); // Refresh the page to update session state
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4 bg-gray-100 rounded shadow-lg max-w-md mx-auto">
      {!session ? (
        <>
          <h1 className="text-2xl font-bold">Login to StrongStart</h1>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 text-white font-semibold rounded bg-blue-500 hover:bg-blue-600"
          >
            Sign in with Discord
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-white font-semibold rounded bg-red-500 hover:bg-red-600"
          >
            Sign out
          </button>
        </>
      )}
    </div>
  );
};

export default LoginForm;