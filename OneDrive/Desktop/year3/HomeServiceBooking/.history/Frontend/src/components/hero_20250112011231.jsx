import React, { useState } from 'react';

function Hero() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex items-center flex-col justify-center">
      <h2 className="font-bold">Find your Home Services</h2>
      <h2 className="text-orange-500 font-bold">Explore here for best services</h2>

      <div className="mt-4">
        <input
          type="search"
          placeholder="Search Services"
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-xs"
        />
      </div>
    </div>
  );
}

export default Hero;
