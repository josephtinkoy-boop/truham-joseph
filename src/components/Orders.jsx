import React from "react";
import { Link } from "react-router-dom";

function Orders({ orders = [] }) {

  const safeOrders = Array.isArray(orders) ? orders : [];
  
  // Image base URL (same as Cart.jsx and Makepayment.jsx)
  const img_url = "http://josephtruham.alwaysdata.net/static/images/";

  // Calculate totals
  const totalRevenue = safeOrders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="orders-container">
      <div className="orders-bg">
        <div className="orders-header">
          <div className="orders-icon">📦</div>
          <h2>My Orders</h2>
          <p>Track and manage your orders</p>
          <Link to="/dashboard" className="btn btn-view-dashboard">
            📊 Dashboard →
          </Link>
        </div>

        {/* SUMMARY CARDS */}
        {safeOrders.length > 0 && (
          <div className="orders-summary">
            <div className="summary-card summary-orders">
              <div className="summary-icon">📦</div>
              <div className="summary-content">
                <h5>Total Orders</h5>
                <p className="summary-value">{safeOrders.length}</p>
              </div>
            </div>
            <div className="summary-card summary-revenue">
              <div className="summary-icon">💰</div>
              <div className="summary-content">
                <h5>Total Revenue</h5>
                <p className="summary-value">KES {totalRevenue.toLocaleString()}</p>
              </div>
            </div>
            <div className="summary-card summary-average">
              <div className="summary-icon">📊</div>
              <div className="summary-content">
                <h5>Average Order</h5>
                <p className="summary-value">KES {(totalRevenue / safeOrders.length).toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}

        {safeOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-icon">📦</div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here!</p>
            <Link to="/" className="btn btn-start-shopping">
              🛍 Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-grid">
            {safeOrders.map((order, index) => (
              <div key={order?.id || order?._id || index} className="order-card">
                <div className="order-header">
                  <h5 className="order-number">Order #{index + 1}</h5>
                  <span className="order-status">✅ Completed</span>
                </div>
                
                <div className="order-date">
                  📅 {order?.date || "Unknown date"}
                </div>
                
                <hr />
                
                <div className="order-content">
                  <div className="order-image">
                    {order?.image && (
                      <img 
                        src={order.image.startsWith('http') ? order.image : img_url + order.image} 
                        alt={order.name}
                        className="img-fluid rounded"
                      />
                    )}
                  </div>
                  <div className="order-details">
                    <p className="product-name"><strong>Product:</strong> {order?.name || "Unknown"}</p>
                    <p className="product-price"><strong>Price:</strong> KES {order?.price || 0}</p>
                    <p className="product-qty"><strong>Quantity:</strong> {order?.qty || 1}</p>
                    <p className="product-total">
                      <strong>Total:</strong> KES {order?.total || 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;