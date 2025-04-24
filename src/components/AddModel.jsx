import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddModel = ({ show, handleClose, handleUpload, editProduct, userId }) => {
  const [formData, setFormData] = useState({
    title: "",
    des: "",
    Img_url: "",
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        des: editProduct.des || "",
        Img_url: editProduct.Img_url || "",
      });
    } else {
      setFormData({
        title: "",
        des: "",
        Img_url: "",
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async () => {
    if (!userId) {
      console.error("User ID missing.");
      return;
    }

    if (!formData.title || !formData.des || !formData.Img_url) {
      alert("Please fill all fields");
      return;
    }

    try {
      let response;

      if (editProduct) {
        response = await axios.put(
          `http://localhost:5001/products/update/${editProduct._id}`,
          {
            ...formData,
            userId,
          }
        );
        console.log("✅ Product updated:", response.data);
      } else {
        response = await axios.post(
          `http://localhost:5001/products/create/${userId}`,
          {
            ...formData,
          }
        );
        console.log("✅ Product created:", response.data);
      }

      handleUpload();
      setFormData({ title: "", des: "", Img_url: "" });
      handleClose();
    } catch (error) {
      console.error("❌ Failed to submit product:", error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{editProduct ? "Edit Product" : "Add New Product"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="des"
              value={formData.des}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              name="Img_url"
              value={formData.Img_url}
              onChange={handleChange}
              placeholder="Enter image URL"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={submitForm}>
          {editProduct ? "Update" : "Upload"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModel;
