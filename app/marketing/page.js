import Introduction from "../components/marketing/Introduction";
import HeroSection from "../components/marketing/HeroSection";
import Header from "../components/marketing/Header";
import FeatureSection from "../components/marketing/FeatureSection";
import ImageGrid from "../components/marketing/ImageGrid";
import Callout from "../components/marketing/Callout";
import GetStarted from "../components/marketing/GetStarted";

export const generateMetadata = () => {
    return {
        title: "Belfort",
        description: "Belfort is a marketing agency that helps businesses grow.",
    };
}


export default function Marketing() {
    return (
        <div>
        <Header />
        <HeroSection />
        <Introduction />
        <ImageGrid images={['https://johannesippen.com/img/blog/design-sprint/ideas.jpg','https://standuply.com/blog/wp-content/uploads/2022/04/war-room-1024x576-1.jpg']} />
        <FeatureSection />
        <Callout />
        <GetStarted />
        </div>
    );
    }