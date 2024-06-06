import { AppsIcon, ClockIcon, GearIcon, HomeIcon } from "@primer/octicons-react";
import { DownloadIcon } from "./download-icon";
import { WatchlistDecoration } from "./watchlist-decoration";

export const routes = [
  {
    path: "/",
    nameKey: "home",
    render: () => <HomeIcon />,
  },
  {
    path: "/catalogue",
    nameKey: "catalogue",
    render: () => <AppsIcon />,
  },
  {
    path: "/watchlist",
    nameKey: "watchlist",
    render: () => <ClockIcon />,
    decoration: (active: boolean = false) => <WatchlistDecoration active={active} />
  },
  {
    path: "/downloads",
    nameKey: "downloads",
    render: (isDownloading: boolean) => (
      <DownloadIcon isDownloading={isDownloading} />
    ),
  },
  {
    path: "/settings",
    nameKey: "settings",
    render: () => <GearIcon />,
  },
];
