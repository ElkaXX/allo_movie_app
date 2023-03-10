import React, { useState, useEffect } from 'react';
let timeoutId = 0;
function Search({ textChanged }) {
  const [text, setText] = useState('');

  useEffect(() => {
    timeoutId = setTimeout(() => {
      if (text !== '') {
        textChanged(text);
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, textChanged]);

  return (
    <div className="mt-5">
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}
export default Search;
