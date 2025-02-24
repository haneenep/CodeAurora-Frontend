import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "use-debounce";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedValue] = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="w-64 relative my-4">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="w-full h-12 pl-5 pr-12 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 text-white placeholder-indigo-200 outline-none transition-all duration-300 hover:shadow-md hover:shadow-indigo-500/30 focus:shadow-lg focus:shadow-indigo-500/40"
        />
        <button className="absolute right-2 w-8 h-8 rounded-full flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
          <Search size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
