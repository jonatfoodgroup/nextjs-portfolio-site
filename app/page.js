import Header from "./components/Header";
import ProcessSteps from "./components/ProcessSteps";
import LogoWall from "./components/LogoWall";
import Footer from "./components/marketing/Footer";
import SoftwareList from "./components/SoftwareList";
import ServiceList from "./components/ServicesList";
import LatestArticles from "./components/LatestArticles";
import Masthead from "./components/Masthead";
import WhoWeAreBanner from "./components/WhoWeAreBanner";

export default function Home() {
  return (
    <>
      <Header />
      <Masthead />
      <div className="container mx-auto inner-container -mt-16 bg-white relative z-50 shadow-lg">
        <LogoWall />
      </div>
      <WhoWeAreBanner />
      <LatestArticles />
      <div className="bg-light-orange py-8 md:py-8">
        <ServiceList />
      </div>
      <div className="bg-light-orange py-8 md:py-16">
        <ProcessSteps />
      </div>
      <SoftwareList />
      <Footer />
    </>
  );
}
