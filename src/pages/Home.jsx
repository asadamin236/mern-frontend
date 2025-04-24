import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AddModel from "../components/AddModel";
import ProductCard from "../components/Card";

const Home = () => {
  const Auth = useSelector((state) => state.auth.Auth);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Auth?.user?._id) {
      navigate("/login");
    } else {
      getProducts(Auth.user._id);
    }
  }, [Auth, navigate]);

  const getProducts = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5001/products/getProducts/${userId}`
      );
      setProducts(res.data.Products || []);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductClick = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleUpload = () => {
    getProducts(Auth?.user?._id);
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/products/delete/${id}`);
      getProducts(Auth?.user?._id);
    } catch (err) {
      console.error("Error deleting product:", err.message);
    }
  };

  return (
    <>
      <Navbar onProductClick={handleAddProductClick} />
      <AddModel
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleUpload={handleUpload}
        editProduct={editProduct}
        userId={Auth?.user?._id}
      />

      <div className="container my-4">
        <h2 className="text-center mb-3">Welcome to Our Cards Collection</h2>
        <p className="text-center lead">Explore different options below</p>

        {loading ? (
          <div className="text-center">
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-md-4">
                <ProductCard
                  product={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p>No products available.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
