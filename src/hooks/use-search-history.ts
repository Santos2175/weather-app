import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from './use-local-storage';

interface ISearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<ISearchHistoryItem[]>(
    'search-history',
    []
  );

  const queryClient = useQueryClient();

  const historyQuery = useQuery({
    queryKey: ['search-history'],
    queryFn: () => history,
    initialData: history,
  });

  //   Add to history
  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<ISearchHistoryItem, 'id' | 'searchedAt'>
    ) => {
      const newSearch: ISearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };

      // Remove duplicates and keep only last 10 searches
      const filteredHistory = history.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );

      const newHistory = [newSearch, ...filteredHistory].slice(0, 10);

      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(['search-history'], newHistory);
    },
  });

  //   Clear all history
  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(['search-history'], []);
    },
  });

  return { history: historyQuery.data ?? [], addToHistory, clearHistory };
}
