import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface WatchlistState {
  value: string[];
}

const initialState: WatchlistState = {
  value: [],
};

export const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<WatchlistState["value"]>) => {
      state.value = action.payload;
    },
  },
});

export const { setWatchlist } = watchlistSlice.actions;
