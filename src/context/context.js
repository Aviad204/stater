import { createContext } from "react";

export const AppContext = createContext({
  playersStats: [],
  setPlayersStats: () => {},
  handleShowModalInsight: () => {},
  handleCloseModalInsight: () => {},
  showModalInsight: Boolean,
  handleShowModalTable: () => {},
  handleCloseModalTable: () => {},
  showModalTable: Boolean,
  handleShowModalGraph: () => {},
  handleCloseModalGraph: () => {},
  showModalGraph: Boolean,
});
