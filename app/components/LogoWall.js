const LogoWall = ({
  items = []
}) => {   
  if (!items.length > 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center space-x-4 my-10">
      {items.map((logo, index) => (
        <Logo key={index} src={logo.src} alt={logo.alt} />
      ))}
    </div>
  );
}

const Logo = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="border border-gray-200 dark:border-gray-700 rounded-full" />
  );
}

export default LogoWall;