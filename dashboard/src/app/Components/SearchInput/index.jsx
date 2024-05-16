'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
const SearchInput = ({ onSearch }) => {
  const inputRef = useRef();
  const router = useRouter();
  const handleSearch = (event) => {
    // if (!keyword) return;
    const keyword = inputRef.current.value.trim();
    onSearch(keyword);
  };
  return (
    <div>
      <input placeholder="Filter nama pasien..." className="w-[50%] mb-4 border-2 border-gray-200 active:border-gray-700 p-2 rounded-xl" ref={inputRef} onKeyDown={handleSearch} />
    </div>
  );
};
export default SearchInput;
