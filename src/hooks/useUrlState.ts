import { useSearchParams } from "react-router-dom";

interface DefaultValues {
  page?: number;
  limit?: number;
  search?: string;
}

export const useUrlState = (defaults: DefaultValues) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(
    searchParams.get("page") || String(defaults.page || 1),
    10
  );
  const limit = parseInt(
    searchParams.get("limit") || String(defaults.limit || 10),
    10
  );
  const searchTerm = searchParams.get("search") || defaults.search || "";

  const setPage = (newPage: number) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams, { replace: true });
  };

  const setLimit = (newLimit: number) => {
    searchParams.set("limit", String(newLimit));
    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
  };

  const setSearchTerm = (newSearch: string) => {
    if (newSearch) {
      searchParams.set("search", newSearch);
    } else {
      searchParams.delete("search");
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams, { replace: true });
  };

  return { page, setPage, limit, setLimit, searchTerm, setSearchTerm };
};
