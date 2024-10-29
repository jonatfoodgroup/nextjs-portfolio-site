import StandardView from "../components/marketing/StandardView";
import content_settings from "../data/content_settings";
import luxor from "../data/transportation/luxor";
import InquiryForm from "../components/booking/InquiryForm";

const SpecPage = () => {
    return (
        <>
            {/* <InquiryForm /> */}
            <StandardView content={luxor} />
        </>
    );
}

export default SpecPage;