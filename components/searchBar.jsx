import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (e) => {
    const query = e.target.value;
    onSearch(query);
  };

  return (
    <div className="flex items-center mb-4 md:w-3/4 w-full">
      <input
        type="text"
        placeholder="Enter a value..."
        className="border border-gray-300 p-2 mr-2 text-black  rounded-sm md:w-1/3 outline-slate-300 w-full"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
