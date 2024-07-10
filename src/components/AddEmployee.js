import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddEmployee(props) {
  const [show, setShow] = useState(false);
  
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outline-primary"
        className="block my-auto m-2" 
        onClick={handleShow}>
        + Add Employee
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
              
              props.onAddEmployee(name, role, imageUrl);
              setName("");
              setRole("");
              setImageUrl("");
            }}
          >
            <Form.Label>Employee name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Angus Young"
              value={name}
              onChange={(e) => {setName(e.target.value)}}/>
            <br />

            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Guitar Player"
              value={role}
              onChange={(e) => {setRole(e.target.value)}}/>
            <br />

            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="http://exemple.com/image.jpg"
              value={imageUrl}
              onChange={(e) => {setImageUrl(e.target.value)}}/>
            <br />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button form="editModal" type="submit" variant="primary" onClick={handleClose}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEmployee;
