import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <Input
      placeholder="Search for a recipe..."
      value={searchTerm}
      size="md"
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      leftSection={<IconSearch size={16} />}
    />
  );
}

export default SearchBar;
