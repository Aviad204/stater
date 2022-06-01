import "./court.css";
import React, { useContext } from "react";
import SinglePlayer from "../SinglePlayer/SinglePlayer";
import { playerFakeData } from "../../constants";
import { Button, Modal } from "react-bootstrap";
import { AppContext } from "../../context/context";
import Stats from "../Stats/Stats";

function Court() {
  const { handleCloseModalInsight, showModalInsight } = useContext(AppContext);
  return (
    <>
      <Modal
        show={showModalInsight}
        onHide={handleCloseModalInsight}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Game Overall Statistics</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-container-flex d-flex w-100">
          <div className="court-container left-modal-container">
            {playerFakeData.map((player) => (
              <SinglePlayer player={player} />
            ))}
            <div className="line"></div>
            <div className="half"></div>
            <div className="panelty left"></div>
            <div className="panelty right"></div>
            <div className="p-spot left">&nbsp;</div>
            <div className="p-spot right">&nbsp;</div>
            <div className="center"></div>
            <div className="p-place left"></div>
            <div className="p-place right"></div>
          </div>
          <div className="right-modal-container">
            <Stats />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalInsight}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Court;
