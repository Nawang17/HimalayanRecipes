import React from 'react';
import { Input } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Input
      placeholder="Search for a recipe..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
    />
  );
}

export default SearchBar;
