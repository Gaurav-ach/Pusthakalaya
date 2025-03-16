function Header() {
  return (
      <div className="p-5 shadow-sm">
          <div className="flex items-center gap-8">
                <img src='/logo.png' alt='logo' width={100} height={100} />
              <div className="flex items-center gap-6">
                     <h2>
                     Home
                    </h2>
                  <h2>
                      Services
                    </h2>
                    <h2>
                     About US
                    </h2> 
                </div>
            </div>
      </div>
  );
}

export default Header;
