import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function EditEmployee(props) {
  const [show, setShow] = useState(false);
  
  const [name, setName] = useState(props.name);
  const [role, setRole] = useState(props.role);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button 
        variant="outline-primary"
        size="sm"
        className="rounded-pill"
        form="editModal"
        onClick={handleShow}
      >
        Update
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form 
            id="editModal"
            onSubmit={(e) => {
              e.preventDefault();
              
              props.onUpdateEmployee(props.id, name, role);
              handleClose();
            }}
          >
            <Form.Label>Employee name</Form.Label>
            <Form.Control 
              type="text"
              value={name}
              onChange={(e) => {setName(e.target.value)}}/>
            <br />

            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={role}
              onChange={(e) => {setRole(e.target.value)}}/>
            <br />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button form="editModal" type="submit" variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditEmployee;
