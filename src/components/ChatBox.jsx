import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ChatBox.css';

// Default contacts for the chat
const DEFAULT_CONTACTS = [
  { id: 1, name: 'Tinkoy Shop (Seller)', avatar: '🏪', online: true },
  { id: 2, name: 'Support Team', avatar: '🎧', online: true },
  { id: 3, name: 'Delivery Team', avatar: '🚚', online: false },
];

function ChatBox({ currentUser = "Customer" }) {
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      localStorage.setItem('chat_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedContact]);

  // Filter contacts based on search
  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get messages for selected contact
  const getChatMessages = () => {
    if (!selectedContact) return [];
    return messages[selectedContact.id] || [];
  };

  // Send a message
  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const messageData = {
      id: Date.now(),
      text: newMessage,
      sender: currentUser,
      timestamp: new Date().toLocaleString(),
      isOwn: true,
    };

    // Update messages for this contact
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), messageData]
    }));

    // Simulate auto-reply from the other person
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: getAutoReply(newMessage),
        sender: selectedContact.name,
        timestamp: new Date().toLocaleString(),
        isOwn: false,
      };
      setMessages(prev => ({
        ...prev,
        [selectedContact.id]: [...(prev[selectedContact.id] || []), autoReply]
      }));
    }, 1000);

    setNewMessage("");
  };

  // Comprehensive auto-reply responses for all website features
  const getAutoReply = (msg) => {
    const q = msg.toLowerCase();
    
    // ==================== ABOUT SHOP ====================
    if (q.includes('about') || q.includes('who are you') || q.includes('what is')) {
      return "Tinkoy Shop is your one-stop online shopping destination. We offer a wide variety of products with easy browsing, secure payments via M-Pesa, and reliable delivery across Kenya.";
    }
    
    // ==================== GREETINGS ====================
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('greetings')) {
      const greetings = [
        "Hello! Welcome to Tinkoy Shop 👋 How can we help you today?",
        "Hi there! Thanks for reaching out to Tinkoy Shop. What would you like to know?",
        "Hey! Happy to help! What can we assist you with?"
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // ==================== PRODUCTS ====================
    if (q.includes('product') || q.includes('item') || q.includes('shop') || q.includes('browse') || q.includes('catalog')) {
      return "You can browse all products on our Home page. Click on any product to view details, price, and description. Use the 'Add to Cart' button to add items to your shopping cart.";
    }
    
    if (q.includes('add product') || q.includes('sell') || q.includes('list product') || q.includes('upload product')) {
      return "To add a product for sale, go to Menu → Add Product. Fill in the product name, description, cost, and upload a photo. Click submit to list it on the shop.";
    }
    
    if (q.includes('available') || q.includes('in stock') || q.includes('out of stock') || q.includes('stock')) {
      return "Product availability is shown on each product page. If a product is out of stock, you can contact us to check restock dates or ask about similar alternatives.";
    }
    
    // ==================== CART ====================
    if (q.includes('cart') || q.includes('add to cart') || q.includes('shopping cart') || q.includes('basket')) {
      return "To add items to your cart, browse products and click 'Add to Cart'. You can view your cart anytime by clicking the Cart link in the navigation menu (top right).";
    }
    
    if (q.includes('remove') || q.includes('delete') || q.includes('remove from cart') || q.includes('clear cart')) {
      return "To remove items from your cart, go to the Cart page and click the delete/remove button next to each item. You can also clear all items.";
    }
    
    // ==================== ORDERS ====================
    if (q.includes('order') || q.includes('orders') || q.includes('tracking') || q.includes('status') || q.includes('history')) {
      return "You can view all your orders in the Orders page. It shows your order history, total spending, and individual order details. Go to Menu → Dashboard to see your order analytics.";
    }
    
    if (q.includes('my order') || q.includes('where is my order') || q.includes('order status')) {
      return "To check your order status, please provide your order number or check the Orders page in your dashboard for the latest status.";
    }
    
    // ==================== PAYMENTS ====================
    if (q.includes('payment') || q.includes('pay') || q.includes('mpesa') || q.includes('card') || q.includes('bank') || q.includes('checkout')) {
      return "We accept payments via M-Pesa (most popular in Kenya), credit/debit cards, and bank transfers. During checkout, enter your M-Pesa phone number and we'll send you a STK push prompt to complete payment.";
    }
    
    if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('kes') || q.includes('ksh')) {
      return "Product prices are displayed on each product page. The total at checkout includes all item costs. Free delivery is available for orders over KES 10,000!";
    }
    
    if (q.includes('discount') || q.includes('coupon') || q.includes('promo') || q.includes('offer') || q.includes('sale')) {
      return "Check our homepage for current promotions and discounts! We occasionally offer special deals. Sign up to stay updated on new offers.";
    }
    
    // ==================== ACCOUNT ====================
    if (q.includes('account') || q.includes('login') || q.includes('signin') || q.includes('password') || q.includes('forgot')) {
      return "To sign in, click Menu → Sign In and enter your credentials. If you forgot your password, use the password reset option on the sign-in page.";
    }
    
    if (q.includes('signup') || q.includes('register') || q.includes('sign up') || q.includes('create account')) {
      return "To create an account, click Menu → Sign Up and fill in your details. Having an account lets you track orders, save favorites, and faster checkout.";
    }
    
    if (q.includes('profile') || q.includes('edit profile') || q.includes('my account')) {
      return "You can manage your account details through the Sign In page. Update your information when needed for faster checkout.";
    }
    
    // ==================== DELIVERY ====================
    if (q.includes('delivery') || q.includes('shipping') || q.includes('deliver') || q.includes('ship') || q.includes('arrival') || q.includes('when will')) {
      return "Delivery takes 2-5 business days within Kenya. Free delivery for orders over KES 10,000! For express delivery, contact us to check availability and extra costs.";
    }
    
    if (q.includes('delivery cost') || q.includes('shipping fee') || q.includes('delivery charge')) {
      return "Delivery is FREE for orders over KES 10,000! For orders below that, a small delivery fee applies based on your location.";
    }
    
    if (q.includes('address') || q.includes('location') || q.includes('deliver to')) {
      return "During checkout, you can provide your delivery address. We deliver across Kenya - just ensure your address is accurate for smooth delivery.";
    }
    
    // ==================== RETURNS & REFUNDS ====================
    if (q.includes('return') || q.includes('refund') || q.includes('exchange') || q.includes('change product')) {
      return "We accept returns within 7 days of delivery for unused items in original packaging. Please contact support with your order details to initiate a return or refund.";
    }
    
    if (q.includes('damaged') || q.includes('broken') || q.includes('wrong item')) {
      return "We're sorry if you received a damaged or wrong item! Please contact us immediately with your order number and photos of the issue. We'll arrange a replacement or refund.";
    }
    
    // ==================== DASHBOARD & ANALYTICS ====================
    if (q.includes('dashboard') || q.includes('analytics') || q.includes('stats') || q.includes('revenue') || q.includes('sales')) {
      return "Your Dashboard shows order statistics including total orders, revenue, items sold, and average order value. Access it via Menu → Dashboard.";
    }
    
    if (q.includes('chart') || q.includes('graph') || q.includes('report') || q.includes('visualize')) {
      return "The Chart page provides visual representations of your sales data. View graphs of revenue trends and order patterns. Access via Menu → Chart.";
    }
    
    // ==================== CONTACT & SUPPORT ====================
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('email')) {
      return "You can reach us through this chat! For urgent matters, check the Footer section for our contact details. We're available Monday-Saturday, 8am-6pm.";
    }
    
    if (q.includes('help') || q.includes('assist') || q.includes('support') || q.includes('customer service')) {
      return "We're here to help! You can ask about:\n• Products & shopping\n• Orders & tracking\n• Payments & checkout\n• Delivery info\n• Returns & refunds\n• Account issues\n\nWhat would you like to know?";
    }
    
    // ==================== COMPLAINTS ====================
    if (q.includes('complaint') || q.includes('problem') || q.includes('issue') || q.includes('wrong') || q.includes('not happy')) {
      return "We're sorry to hear about your experience! Please describe the issue in detail (order number, product, problem). We'll work to resolve it as quickly as possible.";
    }
    
    // ==================== THANKS ====================
    if (q.includes('thank') || q.includes('thanks') || q.includes('appreciate') || q.includes('ty')) {
      const thanks = [
        "You're welcome! Happy to help! 😊",
        "Thank you for choosing Tinkoy Shop! Let us know if you need anything else.",
        "It's our pleasure! Feel free to reach out anytime."
      ];
      return thanks[Math.floor(Math.random() * thanks.length)];
    }
    
    // ==================== GOODBYE ====================
    if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('later') || q.includes('farewell') || q.includes('cya')) {
      return "Goodbye! Thank you for shopping with Tinkoy Shop. We look forward to serving you again! 👋";
    }
    
    // ==================== WEBSITE INFO ====================
    if (q.includes('website') || q.includes('site') || q.includes('url') || q.includes('link')) {
      return "Tinkoy Shop is an online e-commerce platform. Browse products, add to cart, and checkout easily. Use the Menu button in the navigation to access all pages.";
    }
    
    if (q.includes('how to') || q.includes('how do i')) {
      return "Here's a quick guide:\n1. Browse products on the Home page\n2. Click 'Add to Cart' on items you want\n3. Go to Cart and click Checkout\n4. Enter your M-Pesa number for payment\n5. Complete payment and wait for delivery!\n\nNeed help with a specific step?";
    }
    
    // ==================== DEFAULT RESPONSES ====================
    const responses = [
      "Thanks for messaging Tinkoy Shop! For quick help, you can ask about: products, orders, payments, delivery, or returns. What would you like to know?",
      "We appreciate your inquiry! Could you provide more details so we can assist you better? You can ask about shopping, orders, payments, or any other questions.",
      "Got it! Our team is ready to help. What specific information do you need about Tinkoy Shop?",
      "Thanks for reaching out! We have information about:\n• Shopping & products\n• Your orders\n• Payments (M-Pesa)\n• Delivery\n• Returns\n• Account help\n\nJust ask! 😊"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Start a new conversation
  const startNewChat = (contact) => {
    setSelectedContact(contact);
    if (!messages[contact.id]) {
      setMessages(prev => ({
        ...prev,
        [contact.id]: [{
          id: Date.now(),
          text: `Chat started with ${contact.name}`,
          sender: 'System',
          timestamp: new Date().toLocaleString(),
          isOwn: false,
        }]
      }));
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>💬 Messages</h2>
        <Link to="/dashboard" className="btn btn-outline-secondary btn-sm">
          ← Back
        </Link>
      </div>

      <div className="row">
        {/* CONTACTS SIDEBAR */}
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">📱 Chats</h5>
            </div>
            
            {/* Search */}
            <div className="p-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Contact List */}
            <div className="chat-contacts-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {filteredContacts.map(contact => (
                <div
                  key={contact.id}
                  className={`chat-contact-item p-3 ${selectedContact?.id === contact.id ? 'bg-light' : ''}`}
                  onClick={() => startNewChat(contact)}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #eee' }}
                >
                  <div className="d-flex align-items-center">
                    <span className="contact-avatar me-2" style={{ fontSize: '24px' }}>
                      {contact.avatar}
                    </span>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between">
                        <strong>{contact.name}</strong>
                        {contact.online && (
                          <span className="badge bg-success">Online</span>
                        )}
                      </div>
                      <small className="text-muted">
                        {messages[contact.id]?.length > 0 
                          ? messages[contact.id][messages[contact.id].length - 1].text.substring(0, 30) + '...'
                          : 'No messages yet'}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CHAT WINDOW */}
        <div className="col-md-8">
          <div className="card shadow" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="card-header bg-white d-flex align-items-center p-3">
                  <span style={{ fontSize: '30px' }}>{selectedContact.avatar}</span>
                  <div className="ms-2">
                    <h5 className="mb-0">{selectedContact.name}</h5>
                    <small className="text-success">
                      {selectedContact.online ? '● Online' : '○ Offline'}
                    </small>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="chat-messages flex-grow-1 p-3" style={{ overflowY: 'auto', background: '#f8f9fa' }}>
                  {getChatMessages().map((msg, idx) => (
                    <div
                      key={idx}
                      className={`mb-3 ${msg.isOwn ? 'text-end' : 'text-start'}`}
                    >
                      <div
                        className={`d-inline-block p-2 rounded ${
                          msg.sender === 'System'
                            ? 'bg-secondary text-white'
                            : msg.isOwn
                            ? 'bg-primary text-white'
                            : 'bg-white border'
                        }`}
                        style={{ maxWidth: '70%', textAlign: 'left' }}
                      >
                        {msg.sender !== 'System' && (
                          <small className="d-block text-opacity-50" style={{ fontSize: '10px' }}>
                            {msg.sender}
                          </small>
                        )}
                        <div>{msg.text}</div>
                        <small className="text-opacity-75" style={{ fontSize: '10px' }}>
                          {msg.timestamp}
                        </small>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="card-footer bg-white p-2">
                  <form onSubmit={sendMessage} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      Send ➤
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <div className="text-center text-muted p-4">
                  <span style={{ fontSize: '60px' }}>💬</span>
                  <h4>Select a conversation</h4>
                  <p>Choose a contact from the list to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
