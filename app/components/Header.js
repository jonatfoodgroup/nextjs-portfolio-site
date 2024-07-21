import Button from "./Button";
const Header = () => {

  return (
    <header className="py-4 top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl text-black font-bold">:D</div>
        <nav className="space-x-6">
          <a
            href="#"
            className="text-black hover:text-gray-800 border px-2 py-1 rounded-full border-gray-800"
          >
            Home
          </a>
          <a href="#" className="text-black hover:text-gray-800">
            About
          </a>
          <a href="#" className="text-black hover:text-gray-800">
            Services
          </a>
          <a href="#" className="text-black hover:text-gray-800">
            Portfolio
          </a>
        </nav>
        <div>
          <Button text="Get in touch" />
        </div>
      </div>
    </header>
  );
};


export default Header;