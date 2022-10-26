import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.min.css';

import { ChakraProvider } from "@chakra-ui/react";

import NavbarTop from "./components/navbar/NavbarTop";
import CsvParser from "./components/csv-parser/CsvParser";

import { AppContext } from "./context/context";
import { useState } from "react";

function App() {
  const [playersStats, setPlayersStats] = useState(null);

  // Handeling Insight Modal
  const [showModalInsight, setShowModalInsight] = useState(false);
  const handleCloseModalInsight = (e) => {
    setShowModalInsight((pre) => !pre);
  };
  const handleShowModalInsight = (e) => {
    e.preventDefault();
    setShowModalInsight((pre) => !pre);
  };

  // Handeling Table Modal
  const [showModalTable, setShowModalTable] = useState(false);
  const handleCloseModalTable = (e) => {
    setShowModalTable((pre) => !pre);
  };
  const handleShowModalTable = (e) => {
    e.preventDefault();
    setShowModalTable((pre) => !pre);
  };

  // Handeling Graph Modal
  const [showModalGraph, setShowModalGraph] = useState(false);
  const handleCloseModalGraph = (e) => {
    setShowModalGraph((pre) => !pre);
  };
  const handleShowModalGraph = (e) => {
    e.preventDefault();
    setShowModalGraph((pre) => !pre);
  };

  const contextValues = {
    playersStats,
    setPlayersStats,
    handleCloseModalInsight,
    handleShowModalInsight,
    showModalInsight,
    handleCloseModalTable,
    handleShowModalTable,
    showModalTable,
    handleCloseModalGraph,
    handleShowModalGraph,
    showModalGraph,
  };

  return (
    <ChakraProvider>
      <AppContext.Provider value={contextValues}>
        <div className="App">
          <NavbarTop />
          <CsvParser />
        </div>
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default App;
