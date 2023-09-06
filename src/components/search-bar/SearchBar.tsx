import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

const SearchBar = (props: { onSearch: (searchValue: string) => void }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <TextField
        id="search-bar"
        className="text"
        value={value}
        onChange={(v) => {
          setValue(v.currentTarget.value);
          props.onSearch(value);
        }}
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton
        aria-label="search"
        onClick={() => {
          props.onSearch(value);
        }}
      >
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton>
    </div>
  );
};

export default SearchBar;
