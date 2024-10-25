import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const Filters = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Local state for the search term

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = () => {
    onSearch(searchTerm); // Call the onSearch function passed from the parent
  };

  return (
    <Box my={2}>
      <TextField
        label="Search VIN"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: '16px' }}
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Box>
  );
};

export default Filters;
