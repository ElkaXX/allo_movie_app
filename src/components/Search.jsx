import React, { useState, useEffect } from 'react';

let timerId = 0;

function Search({ searchText, textChanged }) {
  const [input, setInput] = useState(searchText);
  const [recentlyTyped, setRecentlyTyped] = useState(false);

  useEffect(() => {
    if (recentlyTyped) {
      clearTimeout(timerId);
      timerId = setTimeout(() => textChanged(input), 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [recentlyTyped, input, textChanged]);

  const inputOnChange = (event) => {
    const value = event.target.value;

    setInput(value);
    setRecentlyTyped(true);
  };

  return (
    <div className="mt-5">
      <input
        type="text"
        placeholder="Search"
        className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
        value={input}
        onChange={inputOnChange}
      />
    </div>
  );
}
export default Search;
