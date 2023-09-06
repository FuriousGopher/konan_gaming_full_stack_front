import { Autocomplete, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const SearchBar = () => {
  const [list, setList] = useState([]);

  return (
    <>
      <Typography variant="h4" component={'h1'}>
        React Search Bar
      </Typography>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search title"
            sx={{
              width: 350,
              margin: '10px auto',
            }}
          />
        )}
      />
    </>
  );
};

export default SearchBar;
