import PushNotifications from "../components/PushNotifications";
import LogoutButton from "../components/LogoutButton";

export default function Page() {
    return (
        <div className="container mx-auto p-4">
            <PushNotifications />
            <LogoutButton />
        </div>
    );
}