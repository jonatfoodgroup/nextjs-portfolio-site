import BountyList from "../components/bounties/BountyList";

export async function generateMetadata() {
    return {
        title: "Bounties | StrongStart",
        description: "Discover our bounty offerings.",
    };
}

export default function BountyPage() {
    return (
        <div className="bg-light-orange min-h-screen">
            <div className="container mx-auto py-8">
                <BountyList />
            </div>
        </div>
    );
}