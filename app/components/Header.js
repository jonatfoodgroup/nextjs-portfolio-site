const Header = () => {

  return (
    <header className="py-4  top-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl text-black font-bold">:D</div>
        <nav className="space-x-6">
          <a
            href="#"
            className="text-black hover:text-white border px-2 py-1 rounded-full border-white"
          >
            Home
          </a>
          <a href="#" className="text-black hover:text-white">
            About
          </a>
          <a href="#" className="text-black hover:text-white">
            Services
          </a>
          <a href="#" className="text-black hover:text-white">
            Portfolio
          </a>
        </nav>
        <div>
          <button className="bg-white text-black px-4 py-2 rounded-full">
            Hire Me
          </button>
        </div>
      </div>
    </header>
  );
};


export default Header;