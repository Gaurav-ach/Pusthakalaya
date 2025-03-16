import React from 'react';

function Hero() {
  return (
    <div className="flex items-center flex-col justify-center">
      <h2 className="font-bold">Find your Home Services</h2>
      <h2 className="text-orange-500 font-bold">Explore here for best services</h2>

      <div className="mt-4 flex gap-4">
        {/* Search Bar */}
        <input
          type="search"
          placeholder="Search Services"
                  className="px-4 py-2 border border-gray-300 rounded-md w-full max-w-xs"
                  <Bu></Bu>
        />

        {/* Location Filter */}
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="">Select Location</option>
          <option value="location1">Location 1</option>
          <option value="location2">Location 2</option>
          <option value="location3">Location 3</option>
        </select>

        {/* Category Filter */}
        <select className="px-4 py-2 border border-gray-300 rounded-md">
          <option value="">Select Category</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="cleaning">Cleaning</option>
        </select>

        {/* Filter Button */}
        <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Filter
        </button>
      </div>
    </div>
  );
}

export default Hero;
