import StandardView from "../components/marketing/StandardView";
import luxor from "../data/transportation/luxor";
import forOrganizers from "../data/landings/for-organizers";
import forVenues from "../data/landings/for-venues";

export const generateMetadata = () => {
    return {
        title: "Luxor",
        description: "Experience unmatched reliability and sophistication with Luxor Executive Car Service. Whether for business or pleasure, our fleet and expert chauffeurs deliver unparalleled comfort and style.",
    };
}

const SpecPage = () => {
    return (
        <>
            {/* <InquiryForm /> */}
            <StandardView content={forVenues} />
        </>
    );
}

export default SpecPage;