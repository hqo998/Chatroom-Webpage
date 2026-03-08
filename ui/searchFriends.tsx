'use client';

import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function SearchFriends() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term.toLowerCase());
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
          <input
            name="searchbox"
            className="text-lavender w-full focus:outline-none focus:ring-2 bg-hot-rose rounded-xl p-2"
            placeholder="Search messages..."
            onChange={(e) => {handleSearch(e.target.value)}}
            defaultValue={searchParams.get('query')?.toString()}
          />
  );
};