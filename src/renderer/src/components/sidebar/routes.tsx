import { AppsIcon, ClockIcon, GearIcon, HomeIcon } from "@primer/octicons-react";
import { DownloadIcon } from "./download-icon";

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
