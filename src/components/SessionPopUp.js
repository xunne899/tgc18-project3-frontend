import React, { useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import UserContext from "../contexts/User";

export default function SessionPopup(props) {
  const { showSessionPopUp, context, refreshSession } = useContext(UserContext);
  const handleEndSession = () => {
    context.logoutUser();
  };
  const handleContinueSession = () => {
    console.log("handleContinueSession");
    refreshSession();
  };
  return (
    <Modal show={showSessionPopUp}>
      <Modal.Header>
        <Modal.Title>AFK?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your session will be expiring soon. Want to continue?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleEndSession}>
          No
        </Button>
        <Button variant="primary" onClick={handleContinueSession}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
