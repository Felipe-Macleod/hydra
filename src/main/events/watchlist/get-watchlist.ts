import { watchedRepository } from "@main/repository";

import { registerEvent } from "../register-event";
import { searchRepacks } from "../helpers/search-games";
import { stateManager } from "@main/state-manager";
import { getSteamAppAsset } from "@main/helpers";
import { CatalogueEntry, GameShop } from "@types";

const steamGames = stateManager.getValue("steamGames");

const getWatchlist = async () =>
  watchedRepository
    .find({
      order: {
        createdAt: "desc",
      },
    })
    .then(watchlist => {
      const results: CatalogueEntry[] = [];

      const watchlistGames = steamGames.filter((game) => watchlist.find(({ objectID }) => objectID === String(game.id)));

      for (let i = 0; i < watchlist.length; i++) {
        const game = watchlistGames[i];
        const repacks = searchRepacks(game.name);

        results.push({
          objectID: String(game.id),
          title: game.name,
          shop: "steam" as GameShop,
          cover: getSteamAppAsset("library", String(game.id)),
          repacks,
        });
      }

      return results;
    });

registerEvent("getWatchlist", getWatchlist);
