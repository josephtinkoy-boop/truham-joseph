import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Country data with flags and phone codes
const COUNTRIES = [
  { code: "KE", name: "Kenya", flag: "🇰🇪", dialCode: "254", length: 12 },
  { code: "UG", name: "Uganda", flag: "🇺🇬", dialCode: "256", length: 12 },
  { code: "TZ", name: "Tanzania", flag: "🇹🇿", dialCode: "255", length: 12 },
  { code: "NG", name: "Nigeria", flag: "🇳🇬", dialCode: "234", length: 13 },
  { code: "GH", name: "Ghana", flag: "🇬🇭", dialCode: "233", length: 12 },
  { code: "ZA", name: "South Africa", flag: "🇿🇦", dialCode: "27", length: 11 },
  { code: "ET", name: "Ethiopia", flag: "🇪🇹", dialCode: "251", length: 12 },
  { code: "EG", name: "Egypt", flag: "🇪🇬", dialCode: "20", length: 11 },
  { code: "RW", name: "Rwanda", flag: "🇷🇼", dialCode: "250", length: 12 },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", dialCode: "44", length: 12 },
  { code: "US", name: "United States", flag: "🇺🇸", dialCode: "1", length: 11 },
];

const Makepayment = ({ setOrders }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SUPPORT BOTH CART + SINGLE PRODUCT
  const stateCart = location.state?.cart;
  const stateProduct = location.state?.product;

  // fallback (for refresh)
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  let items = [];

  if (stateCart && Array.isArray(stateCart)) {
    items = stateCart;
  } else if (stateProduct) {
    items = [stateProduct];
  } else {
    items = storedCart;
  }

  const img_url = "http://josephtruham.alwaysdata.net/static/images/";

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]); // Default Kenya

  // Detect country from phone number
  const detectCountry = (phoneNumber) => {
    if (!phoneNumber) return COUNTRIES[0];
    
    const cleaned = phoneNumber.replace(/\D/g, "");
    
    // Check for known country codes
    for (const country of COUNTRIES) {
      if (cleaned.startsWith(country.dialCode)) {
        return country;
      }
      // Also check with leading zero
      if (cleaned.startsWith("0" + country.dialCode.slice(1))) {
        return country;
      }
    }
    
    // Default to Kenya for local numbers
    if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
      return COUNTRIES[0];
    }
    
    return COUNTRIES[0];
  };

  // Format phone number
  const formatPhone = (value) => {
    const cleaned = value.replace(/\D/g, "");
    const dialCode = selectedCountry.dialCode;
    
    if (cleaned.startsWith(dialCode)) {
      return cleaned;
    }
    
    // Remove leading zero if present
    const withoutZero = cleaned.startsWith("0") ? cleaned.slice(1) : cleaned;
    
    return dialCode + withoutZero;
  };

  // Validate phone number
  const validatePhone = (phoneNumber) => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    const expectedLength = selectedCountry.length;
    
    if (cleaned.length < expectedLength - 3) {
      return { valid: false, message: `Phone too short. Expected ${expectedLength} digits.` };
    }
    
    if (cleaned.length > expectedLength) {
      return { valid: false, message: `Phone too long. Maximum ${expectedLength} digits.` };
    }
    
    // Check if starts with correct country code
    const dialCode = selectedCountry.dialCode;
    if (!cleaned.startsWith(dialCode) && !cleaned.startsWith("0" + dialCode.slice(1))) {
      return { valid: false, message: `Phone number must start with ${selectedCountry.flag} ${selectedCountry.dialCode}` };
    }
    
    return { valid: true, message: "Valid phone number" };
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    
    // Auto-detect country
    const detected = detectCountry(value);
    setSelectedCountry(detected);
  };

  // 🚨 SAFE GUARD
  if (!items || items.length === 0) {
    return (
      <div className="payment-empty-container">
        <div className="payment-empty">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some products to checkout</p>
            <Link to="/" className="btn btn-shop-now">
                🛍 Start Shopping
            </Link>
        </div>
      </div>
    );
  }

  // 💰 CALCULATE TOTAL
  const total = items.reduce((sum, item) => {
    const price = Number(item.price || item.product_cost) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  const submit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage("⏳ Processing payment...");
    setError("");

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", total);

      await axios.post(
        "http://josephtruham.alwaysdata.net/api/mpesa_payment",
        data
      );

      // ✅ SAVE ORDERS (MULTIPLE ITEMS)
      if (typeof setOrders === "function") {
        setOrders((prev) => [
          ...prev,
          ...items.map((item) => ({
            id: Date.now() + Math.random(),
            name: item.name || item.product_name,
            price: Number(item.price || item.product_cost),
            qty: Number(item.qty) || 1,
            total:
              (Number(item.price || item.product_cost) || 0) *
              (Number(item.qty) || 1),
            image: item.product_photo || item.image,
            date: new Date().toLocaleString(),
          })),
        ]);
      }

      setMessage("✅ Payment successful! Redirecting...");
      setPhone("");

      // 🧹 CLEAR CART AFTER PAYMENT
      localStorage.removeItem("cart");

      setTimeout(() => {
        navigate("/orders");
      }, 2000);

    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
      setMessage("");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="payment-container">
        <div className="payment-bg">
            <div className="payment-card">
                <div className="payment-header">
                    <div className="payment-icon">💳</div>
                    <h2>Checkout</h2>
                    <p>Complete your order</p>
                </div>

                {/* 🛒 ORDER SUMMARY */}
                <div className="order-summary">
                    <h4>📦 Order Summary</h4>
                    <div className="order-items">
                        {items.map((item, index) => (
                            <div key={index} className="order-item">
                                <img
                                    src={
                                        item.product_photo
                                        ? img_url + item.product_photo
                                        : "https://via.placeholder.com/80"
                                    }
                                    alt={item.name || item.product_name}
                                    className="item-image"
                                />
                                <div className="item-details">
                                    <h5>{item.name || item.product_name}</h5>
                                    <p className="item-price">KES {item.price || item.product_cost}</p>
                                    <p className="item-qty">Qty: {item.qty || 1}</p>
                                </div>
                                <div className="item-total">
                                    KES {((Number(item.price || item.product_cost) || 0) * (Number(item.qty) || 1)).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 💰 TOTAL */}
                <div className="payment-total">
                    <span>Total Amount:</span>
                    <span className="total-amount">KES {total.toLocaleString()}</span>
                </div>

                {/* PAYMENT FORM */}
                <form onSubmit={submit} className="payment-form">
                    {message && <div className="alert alert-info">⏳ {message}</div>}
                    {error && <div className="alert alert-danger">❌ {error}</div>}

                    <div className="form-group">
                        <label>📱 M-Pesa Phone Number</label>
                        <div className="phone-input-container">
                            <div className="country-selector">
                                <span className="country-flag">{selectedCountry.flag}</span>
                                <select 
                                    className="form-select"
                                    value={selectedCountry.code}
                                    onChange={(e) => {
                                        const country = COUNTRIES.find(c => c.code === e.target.value);
                                        setSelectedCountry(country);
                                        setPhone(country.dialCode);
                                    }}
                                >
                                    {COUNTRIES.map(country => (
                                        <option key={country.code} value={country.code}>
                                            {country.flag} {country.name} (+{country.dialCode})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="phone-input-wrapper">
                                <input
                                    type="tel"
                                    placeholder={`e.g. ${selectedCountry.dialCode}7XXXXXXXX`}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    className="form-control phone-input"
                                    required
                                />
                                {phone && (
                                    <div className="phone-validation">
                                        {(() => {
                                            const validation = validatePhone(phone);
                                            return validation.valid ? (
                                                <span className="valid-phone">✅ {validation.message}</span>
                                            ) : (
                                                <span className="invalid-phone">❌ {validation.message}</span>
                                            );
                                        })()}
                                    </div>
                                )}
                            </div>
                        </div>
                        <small>We'll send an STK push to this number</small>
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-payment"
                        disabled={isProcessing}
                    >
                        {isProcessing ? "⏳ Processing..." : "💰 Pay with M-Pesa"}
                    </button>

                    <div className="payment-info">
                        <p>🔒 Secure payment via M-Pesa</p>
                        <Link to="/cart" className="btn-back-cart">
                            ← Back to Cart
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Makepayment;