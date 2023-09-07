import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

const SearchBar = (props: { onSearch: (searchValue: string) => void }) => {
  const [value, setValue] = useState('');
  let timeoutId: NodeJS.Timeout | null = null;

  const delayedSearch = (searchValue: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      props.onSearch(searchValue);
    }, 2000);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    setValue(inputValue);

    delayedSearch(inputValue);
  };

  return (
    <div>
      <TextField
        id="search-bar"
        className="text"
        value={value}
        onChange={handleInputChange}
        label="Enter a game name"
        variant="outlined"
        color="secondary"
        placeholder="Search..."
        size="small"
        InputProps={{
          style: { background: 'white' },
        }}
      />
      <IconButton
        aria-label="search"
        color="error"
        onClick={() => {
          props.onSearch(value);
        }}
      >
        <SearchIcon style={{ fill: 'black' }} />
      </IconButton>
    </div>
  );
};

export default SearchBar;
