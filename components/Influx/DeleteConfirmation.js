import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
 
export default function DeleteConfirmation({ showModal, hideModal, confirmModal, id, index }) {

  return (
    <Modal isOpen={showModal} toggle={hideModal}>
      <ModalHeader toggle={hideModal}>
        Delete Confirmation
      </ModalHeader>
      <ModalBody><div>Do you really want to delete this admin ?</div></ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={hideModal}>
          Cancel
        </Button>
        <Button outline color="warning" onClick={() => confirmModal(id, index) }>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  )
};
