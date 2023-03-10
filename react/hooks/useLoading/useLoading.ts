import { useEffect, useRef, useState } from "react";

const defaultDuration = 1000;

interface UseLoadingProps {
  /** Number of miliseconds before the loading should return true */
  duration?: number;
  /** Indicates if loading is happening or not */
  loading?: boolean;
  /** Skip delay on initial render (if loading prop equals to TRUE) */
  skipOnInitial?: boolean;
}

/**
 * Emits the loading flag if more than provided duration ms has passed.
 * If loading prop changes, will emit false immediately.
 */
export const useLoading = ({
  duration = defaultDuration,
  loading,
  skipOnInitial,
}: UseLoadingProps = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (loading) {
      if (skipOnInitial && isInitial) {
        setIsLoading(true);
        setIsInitial(false);
        return;
      }
      timeoutRef.current = setTimeout(() => {
        setIsLoading(true);
      }, duration);
    } else if (!loading && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [loading, duration, skipOnInitial, isInitial]);

  return isLoading;
};
