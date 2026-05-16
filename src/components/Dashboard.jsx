import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard({ orders = [] }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const safeOrders = Array.isArray(orders) ? orders : [];

  const totalRevenue = safeOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalItems = safeOrders.reduce(
    (sum, order) => sum + (order.items ? order.items.length : order.qty || 1),
    0
  );
  const avgOrderValue = safeOrders.length > 0 ? (totalRevenue / safeOrders.length).toFixed(2) : 0;
  const recentOrders = safeOrders.slice(-5).reverse();

  const chartData = useMemo(() => {
    const recent = safeOrders.slice(-6);
    return {
      labels: recent.map((order, index) => `Order ${index + 1}`),
      datasets: [
        {
          label: "Revenue per Order (KES)",
          data: recent.map((order) => order.total || 0),
          borderColor: "rgb(102, 126, 234)",
          backgroundColor: "rgba(102, 126, 234, 0.3)",
          tension: 0.3,
          fill: true,
        },
      ],
    };
  }, [safeOrders]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Recent Revenue Trend",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `KES ${value}`,
        },
      },
    },
  };

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

        {safeOrders.length === 0 ? (
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
                  <p className="stat-value">{safeOrders.length}</p>
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

            <div className="dashboard-chart-section">
              <div className="section-header">
                <div>
                  <h3>Revenue Chart</h3>
                  <p>Visualize revenue from the most recent orders.</p>
                </div>
                <div className="dashboard-chart-links">
                  <Link to="/chart" className="btn btn-view-chart">
                    📈 Full Analytics
                  </Link>
                  <Link to="/orders" className="btn btn-start-shopping">
                    📦 View All Orders
                  </Link>
                </div>
              </div>

              <div className="chart-box">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="dashboard-orders-section">
              <div className="section-header">
                <div>
                  <h3>Recent Orders</h3>
                  <p>Latest sales and order details at a glance.</p>
                </div>
              </div>

              {recentOrders.length === 0 ? (
                <div className="dashboard-empty">
                  <div className="empty-icon">📦</div>
                  <h3>No orders yet</h3>
                  <p>Complete a sale to populate the dashboard.</p>
                  <Link to="/" className="btn btn-start-shopping">
                    🛍 Start Selling
                  </Link>
                </div>
              ) : (
                <div className="orders-grid">
                  {recentOrders.map((order, index) => (
                    <div key={order?.id || index} className="order-card">
                      <div className="order-header">
                        <h5 className="order-number">Order #{index + 1}</h5>
                        <span className="order-status">✅ Completed</span>
                      </div>

                      <div className="order-date">📅 {order?.date || "Unknown date"}</div>
                      <hr />
                      <div className="order-content">
                        <div className="order-details">
                          <p className="product-name"><strong>Product:</strong> {order?.name || "Unknown"}</p>
                          <p className="product-price"><strong>Price:</strong> KES {order?.price || 0}</p>
                          <p className="product-qty"><strong>Qty:</strong> {order?.qty || 1}</p>
                          <p className="product-total"><strong>Total:</strong> KES {order?.total || 0}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;