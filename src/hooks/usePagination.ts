import { Api } from "@/services/axios";
import { useCallback, useEffect, useState } from "react";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
}

interface UsePaginationProps {
  initialPage?: number;
  itemsPerPage?: number;
  apiEndpoint: string;
  searchQuery?: string;
}

export function usePagination<T>({
  initialPage = 1,
  itemsPerPage = 10,
  apiEndpoint,
  searchQuery = "",
}: UsePaginationProps) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: initialPage,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: itemsPerPage,
  });

  const fetchData = useCallback(
    async (page: number) => {
      setLoading(true);
      setError(null);

      try {
        const searchParams = new URLSearchParams();
        searchParams.append("page", page.toString());
        searchParams.append("limit", itemsPerPage.toString());

        if (searchQuery) {
          searchParams.append("search", searchQuery);
        }

        const response = await Api.get<PaginatedResponse<T>>(
          `${apiEndpoint}?${searchParams.toString()}`
        );

        setData(response.data.data);

        setPaginationState({
          currentPage: page,
          totalPages: response.data.totalPages,
          totalItems: response.data.total,
          itemsPerPage,
        });
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Pagination fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [apiEndpoint, itemsPerPage, searchQuery]
  );

  const nextPage = useCallback(() => {
    if (paginationState.currentPage < paginationState.totalPages) {
      fetchData(paginationState.currentPage + 1);
    }
  }, [paginationState.currentPage, paginationState.totalPages, fetchData]);

  const prevPage = useCallback(() => {
    if (paginationState.currentPage > 1) {
      fetchData(paginationState.currentPage - 1);
    }
  }, [paginationState.currentPage, fetchData]);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= paginationState.totalPages) {
        fetchData(page);
      }
    },
    [paginationState.totalPages, fetchData]
  );

  const getVisiblePages = useCallback(() => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: number[] = [];
    let lastNumber: number | null = null;

    for (let i = 1; i <= paginationState.totalPages; i++) {
      if (
        i === 1 ||
        i === paginationState.totalPages ||
        (i >= paginationState.currentPage - delta &&
          i <= paginationState.currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (const currentNumber of range) {
      if (lastNumber !== null) {
        if (currentNumber - lastNumber === 2) {
          rangeWithDots.push(lastNumber + 1);
        } else if (currentNumber - lastNumber !== 1) {
          rangeWithDots.push(-1);
        }
      }

      rangeWithDots.push(currentNumber);
      lastNumber = currentNumber;
    }

    return rangeWithDots;
  }, [paginationState.currentPage, paginationState.totalPages]);

  useEffect(() => {
    fetchData(initialPage);
  }, [fetchData, initialPage]);

  return {
    data,
    loading,
    error,
    currentPage: paginationState.currentPage,
    totalPages: paginationState.totalPages,
    totalItems: paginationState.totalItems,
    itemsPerPage: paginationState.itemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    visiblePages: getVisiblePages(),
    isFirstPage: paginationState.currentPage === 1,
    isLastPage: paginationState.currentPage === paginationState.totalPages,
    refetch: () => fetchData(paginationState.currentPage),
  };
}
