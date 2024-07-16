import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function AddCustomer(props) {
  
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");

  const handleClose = () => props.toggleShow();

  return (
    <>
      <Button
        variant="primary"
        className="block my-auto m-2" 
        onClick={props.toggleShow}>
        + Add Customer
      </Button>

      <Modal
        show={props.show}
        onHide={handleClose}
        backdrop="static"
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form 
            id="editModal"
            onSubmit={(e) => {
              e.preventDefault();
              
              props.onAddCustomer(name, industry);
              setName("");
              setIndustry("");
            }}
          >
            <Form.Label>Customer name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Google"
              value={name}
              onChange={(e) => {setName(e.target.value)}}/>
            <br />

            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Computing"
              value={industry}
              onChange={(e) => {setIndustry(e.target.value)}}/>
            <br />

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button form="editModal" type="submit" variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
