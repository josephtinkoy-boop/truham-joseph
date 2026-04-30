import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// AI Response generator based on chart data
const generateAIResponse = (question, chartData) => {
  const labels = chartData?.labels || [];
  const datasets = chartData?.datasets || [];
  const data = datasets[0]?.data || [];
  
  if (data.length === 0) {
    return "No data available to analyze. Make some orders first!";
  }
  
  const questionLower = question.toLowerCase();
  
  // Calculate basic statistics
  const sum = data.reduce((a, b) => a + b, 0);
  const avg = (sum / data.length).toFixed(2);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const maxIndex = data.indexOf(max);
  const minIndex = data.indexOf(min);
  
  if (questionLower.includes('highest') || questionLower.includes('peak') || questionLower.includes('maximum')) {
    return `The highest value is KES ${max} in ${labels[maxIndex]}. This represents the peak performance during that period.`;
  }
  
  if (questionLower.includes('lowest') || questionLower.includes('minimum') || questionLower.includes('dip')) {
    return `The lowest value is KES ${min} in ${labels[minIndex]}. This indicates a period of reduced activity or performance.`;
  }
  
  if (questionLower.includes('average') || questionLower.includes('mean')) {
    return `The average value across all periods is KES ${avg}. This gives you a baseline to compare individual data points against.`;
  }
  
  if (questionLower.includes('total') || questionLower.includes('sum') || questionLower.includes('overall')) {
    return `The total across all periods is KES ${sum}. This represents the cumulative value for the entire dataset.`;
  }
  
  if (questionLower.includes('trend') || questionLower.includes('increasing') || questionLower.includes('decreasing')) {
    const firstHalf = data.slice(0, Math.floor(data.length / 2)).reduce((a, b) => a + b, 0);
    const secondHalf = data.slice(Math.floor(data.length / 2)).reduce((a, b) => a + b, 0);
    if (secondHalf > firstHalf) {
      return `Based on the data, there's an upward trend. The second half of the period shows ${((secondHalf - firstHalf) / firstHalf * 100).toFixed(1)}% more activity compared to the first half.`;
    } else if (secondHalf < firstHalf) {
      return `Based on the data, there's a downward trend. The second half shows ${((firstHalf - secondHalf) / firstHalf * 100).toFixed(1)}% less activity compared to the first half.`;
    }
    return `The data shows a relatively stable pattern with no significant trend in either direction.`;
  }
  
  if (questionLower.includes('compare') || questionLower.includes('difference')) {
    return `Here's a comparison: Highest (KES ${max}) is ${(max / min).toFixed(1)}x the lowest (KES ${min}). The range spans KES ${max - min}.`;
  }
  
  // Default responses
  const responses = [
    `I can see your chart has ${data.length} data points across ${labels.join(', ')}. The values range from KES ${min} to KES ${max}. Would you like me to analyze specific aspects like trends, peaks, or averages?`,
    `This chart shows ${datasets[0]?.label || 'data'} with values: ${data.join(', ')}. What specific insight would you like about this data?`,
    `Based on the chart data, you have ${data.length} entries. The average is KES ${avg}, with values oscillating between KES ${min} and KES ${max}. Ask me about trends, peaks, or comparisons!`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

function Chart({ type: initialType = 'bar', orders = [], title = 'Sales Analytics', height = '350px' }) {
  const [chartType, setChartType] = useState(initialType);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I\'m your Chart AI assistant. Ask me anything about your sales data - trends, peaks, averages, or comparisons!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Generate chart data from orders
  const chartData = useMemo(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];
    
    if (safeOrders.length === 0) {
      // Default sample data when no orders
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sample Sales (KES)',
            data: [12000, 19000, 3000, 5000, 2000, 3000],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
          },
        ],
      };
    }
    
    // Group orders by product name for pie chart
    const productTotals = {};
    safeOrders.forEach(order => {
      const name = order.name || 'Unknown';
      productTotals[name] = (productTotals[name] || 0) + (order.total || 0);
    });
    
    // Use last 6 orders for line/bar charts
    const recentOrders = safeOrders.slice(-6);
    
    return {
      labels: recentOrders.map((_, i) => `Order ${i + 1}`),
      datasets: [
        {
          label: 'Revenue per Order (KES)',
          data: recentOrders.map(order => order.total || 0),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: chartType === 'pie' 
            ? [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
              ]
            : 'rgba(75, 192, 192, 0.5)',
        },
      ],
      productLabels: Object.keys(productTotals),
      productData: Object.values(productTotals),
    };
  }, [orders, chartType]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
    },
  };

  const renderChart = () => {
    const dataToUse = chartType === 'pie' 
      ? { 
          labels: chartData.productLabels.length > 0 ? chartData.productLabels : chartData.labels,
          datasets: [{
            label: 'Sales by Product (KES)',
            data: chartData.productData.length > 0 ? chartData.productData : chartData.datasets[0].data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 206, 86)',
              'rgb(75, 192, 192)',
              'rgb(153, 102, 255)',
              'rgb(255, 159, 64)',
            ],
            borderWidth: 1,
          }]
        }
      : chartData;

    switch (chartType) {
      case 'line':
        return <Line data={dataToUse} options={options} />;
      case 'pie':
        return <Pie data={dataToUse} options={options} />;
      case 'bar':
      default:
        return <Bar data={dataToUse} options={options} />;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, chartData);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-bg">
        <div className="chart-header">
          <div className="chart-icon">📈</div>
          <h2>Sales Analytics</h2>
          <p>Visualize your business performance</p>
          <Link to="/dashboard" className="btn btn-back-dashboard">
            ← Back to Dashboard
          </Link>
        </div>

        <div className="chart-card">
          {/* Chart Type Buttons */}
          <div className="chart-type-buttons">
            <button
              type="button"
              className={`btn-chart-type ${chartType === 'line' ? 'active' : ''}`}
              onClick={() => setChartType('line')}
            >
              📈 Line
            </button>
            <button
              type="button"
              className={`btn-chart-type ${chartType === 'bar' ? 'active' : ''}`}
              onClick={() => setChartType('bar')}
            >
              📊 Bar
            </button>
            <button
              type="button"
              className={`btn-chart-type ${chartType === 'pie' ? 'active' : ''}`}
              onClick={() => setChartType('pie')}
            >
              🥧 Pie
            </button>
          </div>
          
          <div className="chart-area" style={{ height: height, width: '100%' }}>
            {renderChart()}
          </div>
        </div>
        
        {/* AI Chat Interface */}
        <div className="chart-ai-section">
          <div className="ai-header">
            <span className="ai-icon">🤖</span>
            <strong>Chart AI Assistant</strong>
          </div>
          
          {/* Chat Messages */}
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message ${msg.role}`}
              >
                {msg.role === 'ai' && <span className="msg-icon">🤖</span>}
                <span className="msg-text">{msg.text}</span>
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span>🤖</span>
                <span className="typing-text">Analyzing...</span>
              </div>
            )}
          </div>
          
          {/* Input Field */}
          <div className="chat-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your sales data..."
              className="chat-input"
            />
            <button
              onClick={handleSend}
              className="btn-send"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;