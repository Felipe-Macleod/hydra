import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setLibrary } from "@renderer/features";

export function useWatchlist() {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchlist.value);

  const updateWatchlist = useCallback(async () => {
    return window.electron
      .getLibrary()
      .then((updatedWatchlist) => dispatch(setLibrary(updatedWatchlist)));
  }, [dispatch]);

  return { watchlist, updateWatchlist };
}