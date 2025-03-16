
import { Button } from '@mui/material';

function Header() {
  return (
      <div className="p-5 shadow-sm flex justify-between">
          <div className=" flex items-center gap-8 ">
                <img src='/logo.png' alt='logo' width={100} height={100} />
              <div className=" md:flex items-center gap-6">
                     <h2 className="hover:scale-100 hover:text-purple-500 cursor-pointer">
                     Home
                    </h2>
                  <h2 className="hover:scale-100 hover:text-purple-500 cursor-pointer">
                      Services
                    </h2>
                    <h2 className="hover:scale-100 hover:text-purple-500 cursor-pointer">
                     About US
                    </h2> 
              </div>
             
          </div>
           <div >
                 <Button> Get Started</Button>
              </div>
      </div>
  );
}

export default Header;
