import { fetcher } from '../fetch';
import useSWR from 'swr'

export function useCMSs() {
  const { data, error } = useSWR('/api/cms', fetcher);
  // const isLoadingInitialData = !data && !error;
  // const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  // const isEmpty = data?.[0]?.message?.length === 0;
  // const isReachingEnd = (data && data[data.length - 1]?.cards?.length < limit);
  // const isReachingEnd =
  // isEmpty || (data && data[data.length - 1]?.cards?.length < limit);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCMS(cmsId) {
  return useSWR(`/api/cms/${cmsId}`, fetcher);
}
