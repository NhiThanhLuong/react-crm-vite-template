import { useCallback } from 'react';
import {
  createSearchParams,
  useSearchParams,
  URLSearchParamsInit,
} from 'react-router-dom';

export const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRouter = Object.fromEntries([...searchParams]);

  const setParamsRouter = useCallback((params?: URLSearchParamsInit): void => {
    setSearchParams(createSearchParams(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { paramsRouter, setParamsRouter };
};
