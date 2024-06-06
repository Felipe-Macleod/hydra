import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setWatchlist } from "@renderer/features";

export function useWatchlist() {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchlist.value);

  const updateWatchlist = useCallback(async () => {
    return window.electron
      .getWatchlist()
      .then((updatedWatchlist) => dispatch(setWatchlist(updatedWatchlist.map( ({ objectID }) => objectID ))));
  }, [dispatch]);

  return { watchlist, updateWatchlist };
}