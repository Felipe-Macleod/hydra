import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@renderer/components";
import {
  buildGameDetailsPath,
  steamUrlBuilder,
} from "@renderer/helpers";
import type { CatalogueEntry } from "@types";

import { useEffect, useState } from "react";
import * as styles from "./watchlist.css";
import { useWatchlist } from "@renderer/hooks/use-watchlist";

export function Watchlist() {
  const { watchlist, updateWatchlist } = useWatchlist();

  const { t } = useTranslation("watchlist");

  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [filteredLibrary, setFilteredLibrary] = useState<CatalogueEntry[]>([]);
  const [libraryWithAwaitedGamesOnly, setWatchedGames ] = useState<CatalogueEntry[]>([]);
  
  useEffect(() => {
    setIsLoading(true);
    window.electron.getWatchlist().then( watchlistGames => {
      setIsLoading(false);
      return setWatchedGames(watchlistGames);
    });
  }, [watchlist])

  useEffect(() => {
    setFilteredLibrary(libraryWithAwaitedGamesOnly);
  }, [libraryWithAwaitedGamesOnly]);

  const removeFromWatchlist = (objectId: string) => {
    window.electron.removeGameFromWatchlist(objectId).then( _ => updateWatchlist() );
  }

  const getGameActions = (game: CatalogueEntry) => {
    return (
      <>
        <Button
          onClick={() => navigate(buildGameDetailsPath(game))}
          theme="outline"
          disabled={!game.repacks.length}
        >
          {t("download")}
        </Button>

        <Button
          onClick={() => removeFromWatchlist(game.objectID)}
          theme="outline"
        >
          {t("remove_from_list")}
        </Button>
      </>
    );
  };

  const handleFilter: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilteredLibrary(
      libraryWithAwaitedGamesOnly.filter((game) =>
        game.title
          .toLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  return (
    <section className={styles.downloadsContainer}>
      <TextField placeholder={t("filter")} onChange={handleFilter} />

      <ul className={styles.downloads}>
        {!isLoading && filteredLibrary.map((game) => (
          <li
            key={game.objectID}
            className={styles.download()}
          >
            <div className={styles.downloadCover}>
              <div className={styles.downloadCoverBackdrop}>
                <img
                  src={steamUrlBuilder.library(game.objectID)}
                  className={styles.downloadCoverImage}
                  alt={game.title}
                />                
              </div>
            </div>
            <div className={styles.downloadRightContent}>
              <div className={styles.downloadDetails}>
                <div className={styles.downloadTitleWrapper}>
                  <button
                    type="button"
                    className={styles.downloadTitle}
                    onClick={() => navigate(buildGameDetailsPath(game))}
                  >
                    {game.title}
                  </button>
                </div>

                <div className={styles.downloadCoverContent}>
                  { game.repacks.length ? (
                      <ul className={styles.downloadOptions}>
                        {
                          Array.from(
                            new Set(game.repacks.map(({ repacker }) => repacker))
                          ).map((repacker) => (
                            <li key={repacker} className={styles.downloadOption}>
                              <span>{repacker}</span>
                            </li>
                          ))
                        }
                      </ul>
                    ) : (
                      <p className={styles.noDownloadsLabel}>{t("no_downloads")}</p>
                    )
                  }
                </div>
              </div>

              <div className={styles.listItemActions}>
                {getGameActions(game)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
