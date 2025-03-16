import { Button } from '@mui/material';

function Header() {
  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-8">
        <img src='/logo.png' alt='logo' width={100} height={100} />
      </div>
      {/* Centered navigation links */}
      <div className="flex items-center justify-center gap-6 md:flex hidden flex-grow">
        <h2 className="hover:text-blue-500 hover:text-opacity-80 cursor-pointer">
          Home
        </h2>
        <h2 className="hover:text-blue-500 hover:text-opacity-80 cursor-pointer">
          Services
        </h2>
        <h2 className="hover:text-blue-500 hover:text-opacity-80 cursor-pointer">
          About Us
        </h2>
      </div>
      {/* Button on the right side */}
      <div className="flex items-center">
        <Button>
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default Header;
