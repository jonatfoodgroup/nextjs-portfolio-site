import LoginForm from "../../components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* <h1 className="text-4xl font-bold mb-4">Login</h1> */}
            <Link href="/">
                Back to home
            </Link>
            <LoginForm />
        </div>
    );
}