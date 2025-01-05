import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchBox = ({
  searchInput,
  setSearchInput,
  handleSearchSubmit,
  handleKeyDown,
  d,
}) => {

  return (
    <div className="relative">
      <Input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={d.search}
        className="flex-1 pl-5 mx-2 my-4 px-10 outline-none"
      />
      <Search
        onClick={handleSearchSubmit}
        className="absolute top-6 left-4 size-5 text-gray-400 cursor-pointer hover:scale-110"
      />
    </div>
  );
};

export default SearchBox;
