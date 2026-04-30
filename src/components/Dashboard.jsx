import React from "react";
import { Link } from "react-router-dom";

function Dashboard({ orders = [] }) {

  // 💰 Safe revenue calculation
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.total || 0),
    0
  );

  // 📦 Safe item count
  const totalItems = orders.reduce(
    (sum, order) => sum + (order.items ? order.items.length : 0),
    0
  );

  // 📊 Calculate average order value
  const avgOrderValue = orders.length > 0 
    ? (totalRevenue / orders.length).toFixed(2) 
    : 0;

  return (
    <div className="dashboard-container">
      <div className="dashboard-bg">
        <div className="dashboard-header">
          <div className="dashboard-icon">📊</div>
          <h2>Dashboard</h2>
          <p>Your business analytics at a glance</p>
          <Link to="/chart" className="btn btn-view-chart">
            📈 View Charts →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="dashboard-empty">
            <div className="empty-icon">📊</div>
            <h3>No data available yet</h3>
            <p>Make some orders to see your analytics here!</p>
            <Link to="/" className="btn btn-start-shopping">
              🛍 Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* STATS CARDS */}
            <div className="stats-grid">
              <div className="stat-card stat-orders">
                <div className="stat-icon">📦</div>
                <div className="stat-content">
                  <h5>Total Orders</h5>
                  <p className="stat-value">{orders.length}</p>
                </div>
              </div>

              <div className="stat-card stat-revenue">
                <div className="stat-icon">💰</div>
                <div className="stat-content">
                  <h5>Total Revenue</h5>
                  <p className="stat-value">KES {totalRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card stat-items">
                <div className="stat-icon">🛍</div>
                <div className="stat-content">
                  <h5>Items Sold</h5>
                  <p className="stat-value">{totalItems}</p>
                </div>
              </div>

              <div className="stat-card stat-average">
                <div className="stat-icon">📈</div>
                <div className="stat-content">
                  <h5>Avg Order Value</h5>
                  <p className="stat-value">KES {parseFloat(avgOrderValue).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* RECENT ORDERS TABLE */}
            <div className="recent-orders">
              <h4>Recent Orders</h4>
              <div className="table-responsive">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(-5).reverse().map((order, index) => (
                      <tr key={order?.id || index}>
                        <td>#{index + 1}</td>
                        <td>{order?.name || "Unknown"}</td>
                        <td>KES {order?.price || 0}</td>
                        <td>{order?.qty || 1}</td>
                        <td className="fw-bold">KES {order?.total || 0}</td>
                        <td>{order?.date || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;