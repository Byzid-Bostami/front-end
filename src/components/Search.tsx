'use client'
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim() !== '') {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
    setSearch('');
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center md:justify-between space-x-2">
        <input
          className="px-2 md:py-[4px] py-[1px] w-28 md:w-full rounded-md outline-none ring-1 ring-black/10"
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder="Search"
          required
        />
        <button
          className="capitalize bg-[#00C298] text-sm md:text-base text-white hover:shadow-md hover:shadow-black/50 transition-all duration-150 font-semibold rounded-md py-[4px] px-2 hover:bg-[#269a81]"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
