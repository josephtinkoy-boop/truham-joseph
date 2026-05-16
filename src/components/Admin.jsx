import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./Dashboard";

const Admin = ({ orders }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const img_url = "http://josephtruham.alwaysdata.net/static/images/";

  // Check if user is logged in and is admin
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    console.log("Admin.jsx - User from localStorage:", user);
    console.log("Admin.jsx - User role:", user?.role);
    
    if (!user || user.role !== "admin") {
      console.log("Admin.jsx - Access denied, user is not admin");
      setError("⛔ Admin access required. Please sign in as an administrator.");
    } else {
      console.log("Admin.jsx - Access granted, fetching products");
      fetchProducts();
    }
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://josephtruham.alwaysdata.net/api/products");
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axios.delete(`http://josephtruham.alwaysdata.net/api/products/${id}`);
      setMessage("✅ Product deleted successfully!");
      setProducts(products.filter(p => p.id !== id));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("❌ Failed to delete product");
      setTimeout(() => setError(""), 3000);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      product_name: product.product_name,
      product_cost: product.product_cost,
      product_description: product.product_description,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id) => {
    try {
      const formData = new FormData();
      formData.append("product_name", editForm.product_name);
      formData.append("product_cost", editForm.product_cost);
      formData.append("product_description", editForm.product_description);

      await axios.put(`http://josephtruham.alwaysdata.net/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ Product updated successfully!");
      setEditingId(null);
      setEditForm({});
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("❌ Failed to update product");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Check if user is logged in and is admin
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin") {
    return (
      <div className="admin-access-denied">
        <div className="access-denied-card">
          <div className="denied-icon">🔐</div>
          <h2>Admin Access Required</h2>
          <p>Only administrators can access the admin panel.</p>
          <Link to="/signin" className="btn btn-primary me-2">Sign In as Admin</Link>
          <Link to="/" className="btn btn-outline-secondary">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>🛠️ Admin Dashboard</h2>
        <p>Manage your products - Only admins can make changes</p>
        <div className="admin-info">
          <span className="badge bg-success">👤 Admin: {user?.name || user?.email}</span>
          <button onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }} className="btn btn-outline-danger btn-sm">
            🚪 Logout
          </button>
        </div>
      </div>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-actions">
        <Link to="/addproduct" className="btn btn-primary">
          ➕ Add New Product
        </Link>
        <Link to="/dashboard" className="btn btn-info">
          📊 View Dashboard
        </Link>
        <button onClick={fetchProducts} className="btn btn-outline-secondary">
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="admin-products-table">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>📷 Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No products found</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={img_url + product.product_photo}
                        alt={product.product_name}
                        style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editForm.product_name}
                          onChange={(e) => setEditForm({ ...editForm, product_name: e.target.value })}
                        />
                      ) : (
                        <strong>{product.product_name}</strong>
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <input
                          type="number"
                          className="form-control"
                          value={editForm.product_cost}
                          onChange={(e) => setEditForm({ ...editForm, product_cost: e.target.value })}
                        />
                      ) : (
                        <span className="text-success">${product.product_cost}</span>
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <textarea
                          className="form-control"
                          value={editForm.product_description}
                          onChange={(e) => setEditForm({ ...editForm, product_description: e.target.value })}
                          rows="2"
                        />
                      ) : (
                        <small>{product.product_description?.substring(0, 50)}...</small>
                      )}
                    </td>
                    <td>
                      {editingId === product.id ? (
                        <div className="btn-group">
                          <button
                            onClick={() => saveEdit(product.id)}
                            className="btn btn-success btn-sm"
                          >
                            💾 Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="btn btn-secondary btn-sm"
                          >
                            ❌ Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="btn-group">
                          <button
                            onClick={() => startEdit(product)}
                            className="btn btn-warning btn-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-danger btn-sm"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      
      {/* DASHBOARD SECTION */}
      <Dashboard orders={orders} />
      
    </div>
  );
};

export default Admin;