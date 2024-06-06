import { watchedRepository } from "@main/repository";

import { registerEvent } from "../register-event";

const removeGameFromWatchlist = async (
  _event: Electron.IpcMainInvokeEvent,
  objectID: string,
) => {
  return watchedRepository
    .delete({ objectID });
};

registerEvent("removeGameFromWatchlist", removeGameFromWatchlist);