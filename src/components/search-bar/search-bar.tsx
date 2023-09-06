import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as React from 'react';

export const SearchBar = ({ setSearchQuery }) => {
  return (
    <form>
      <TextField
        id="search-bar"
        className="text"
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          setSearchQuery(e.currentTarget.value);
        }}
        label="Enter a city name"
        variant="outlined"
        placeholder="Search..."
        size="small"
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon style={{ fill: 'blue' }} />
      </IconButton>
    </form>
  );
};

export default SearchBar;
