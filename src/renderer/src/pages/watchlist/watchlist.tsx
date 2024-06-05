import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button, TextField } from "@renderer/components";
import {
  buildGameDetailsPath,
  steamUrlBuilder,
} from "@renderer/helpers";
import { useDownload, useLibrary } from "@renderer/hooks";
import type { Game } from "@types";

import { useEffect, useMemo, useState } from "react";
import { BinaryNotFoundModal } from "../shared-modals/binary-not-found-modal";
import * as styles from "./watchlist.css";

export function Watchlist() {
  const { library } = useLibrary();

  const { t } = useTranslation("watchlist");

  const navigate = useNavigate();

  const [filteredLibrary, setFilteredLibrary] = useState<Game[]>([]);
  const [showBinaryNotFoundModal, setShowBinaryNotFoundModal] = useState(false);

  const {
    removeGameFromLibrary
  } = useDownload();

  const libraryWithAwaitedGamesOnly = useMemo(() => {
    return library.filter((_) => true);
  }, [library]);

  useEffect(() => {
    setFilteredLibrary(libraryWithAwaitedGamesOnly);
  }, [libraryWithAwaitedGamesOnly]);

  const getGameActions = (game: Game) => {
    return (
      <>
        <Button
          onClick={() => navigate(buildGameDetailsPath(game))}
          theme="outline"
          disabled
        >
          {t("download")}
        </Button>

        <Button
          onClick={() => removeGameFromLibrary(game.id)}
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
      <BinaryNotFoundModal
        visible={showBinaryNotFoundModal}
        onClose={() => setShowBinaryNotFoundModal(false)}
      />

      <TextField placeholder={t("filter")} onChange={handleFilter} />

      <ul className={styles.downloads}>
        {filteredLibrary.map((game) => {
          return (
            <li
              key={game.id}
              className={styles.download({
                cancelled: game.status === "removed",
              })}
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

                <div className={styles.downloadActions}>
                  {getGameActions(game)}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
