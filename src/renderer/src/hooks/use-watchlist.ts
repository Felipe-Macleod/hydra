import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setWatchlist } from "@renderer/features";

export function useWatchlist() {
  const dispatch = useAppDispatch();
  const watchlist = useAppSelector((state) => state.watchlist.value);

  const hasRepacks = useCallback(async () => {
    return window.electron
      .getWatchlist()
      .then(watchlistGames => !!watchlistGames.find(({ repacks }) => repacks.length));
  }, [watchlist]);

  const updateWatchlist = useCallback(async () => {
    return window.electron
      .getWatchlist()
      .then((updatedWatchlist) => dispatch(setWatchlist(updatedWatchlist.map( ({ objectID }) => objectID ))));
  }, [dispatch]);

  return { watchlist, updateWatchlist, hasRepacks };
}