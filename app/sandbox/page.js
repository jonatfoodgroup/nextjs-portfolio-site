import PushNotifications from "../components/PushNotifications";
import LogoutButton from "../components/LogoutButton";
import exportCSV from "./exportCSV";
export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <PushNotifications />
            <button
                onClick={exportCSV}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Export CSV
            </button>
            <LogoutButton />
        </div>
    );
}