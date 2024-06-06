import { dataSource } from "./data-source";
import { Game, GameShopCache, Repack, UserPreferences, Watched } from "@main/entity";

export const gameRepository = dataSource.getRepository(Game);

export const repackRepository = dataSource.getRepository(Repack);

export const userPreferencesRepository =
  dataSource.getRepository(UserPreferences);

export const gameShopCacheRepository = dataSource.getRepository(GameShopCache);

export const watchedRepository = dataSource.getRepository(Watched);