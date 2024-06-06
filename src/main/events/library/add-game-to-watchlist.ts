import { watchedRepository } from "@main/repository";

import { registerEvent } from "../register-event";

const addGameToWatchlist = async (
  _event: Electron.IpcMainInvokeEvent,
  objectID: string,
) => {
  return watchedRepository
    .insert({
      objectID,
    });
};

registerEvent("addGameToWatchlist", addGameToWatchlist);
