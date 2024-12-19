import Header from "./components/Header";
import ProcessSteps from "./components/ProcessSteps";
import FancyMasthead from "./components/FancyMasthead";
import LogoWall from "./components/LogoWall";
import Footer from "./components/marketing/Footer";
import SoftwareList from "./components/SoftwareList";
import ServiceList from "./components/ServicesList";
import LatestArticles from "./components/LatestArticles";

export default function Home() {
  return (
    <>
      <Header />
      <FancyMasthead />
      <LatestArticles />
      <LogoWall />
      <div className="bg-light-gray py-8 md:py-8">
        <ServiceList />
      </div>
      <div className="bg-light-blue py-8 md:py-16">
        <ProcessSteps />
      </div>
      <SoftwareList />
      <div className="container mx-auto mt-4 md:mt-0 inner-container">

      </div>
      <Footer />
    </>
  );
}
