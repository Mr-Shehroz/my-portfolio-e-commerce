// app/search/page.tsx
import { Suspense } from "react";
import SearchResultsClient from "./search-results-client";

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResultsClient />
    </Suspense>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400 text-lg">Loading search results...</p>
    </div>
  );
}
