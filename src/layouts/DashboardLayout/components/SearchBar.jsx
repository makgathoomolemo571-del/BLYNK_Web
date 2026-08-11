import { Search } from "lucide-react";
import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar">

      <Search size={18} />

      <input
        type="search"
        placeholder="Search people, creators, businesses, products..."
      />

    </div>
  );
}