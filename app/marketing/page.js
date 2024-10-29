
import content_settings from "../data/content_settings";
import StandardView from "../components/marketing/StandardView";

export const generateMetadata = () => {
    return {
        title: "Belfort",
        description: "Belfort is a marketing agency that helps businesses grow.",
    };
}


export default function Marketing() {
    return (
        <div>
            <StandardView
                content={content_settings}
            />
        </div>
    );
}