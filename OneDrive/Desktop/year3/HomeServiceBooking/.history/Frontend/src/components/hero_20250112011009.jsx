import React, { useState } from 'react';
import { TextField } from '@mui/material';

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
        <TextField
          label="Search Services"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          sx={{
            maxWidth: 400, // Customize the maximum width if needed
          }}
        />
      </div>
    </div>
  );
}

export default Hero;
