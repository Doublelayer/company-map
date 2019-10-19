import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleInfoModal } from "../../../store/actions/index";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function InfoModal() {
  const showModal = useSelector(state => state.showInfoModal);
  const dispatch = useDispatch();

  return (
    <Modal isOpen={showModal}>
      <ModalHeader>Hinweis zur Standortermittlung</ModalHeader>
      <ModalBody>Du hast die Standortermittlung nicht erlaubt. Dein Standort wurde anhand deiner IP-Adresse ermittelt!</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => dispatch(toggleInfoModal())}>
          Okay
        </Button>
      </ModalFooter>
    </Modal>
  );
}
