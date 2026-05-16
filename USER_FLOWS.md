# USER JOURNEY FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│                      👤 USER JOURNEY MAP                         │
└─────────────────────────────────────────────────────────────────┘

GUEST USER:
───────────
  Home Page (/) 
      ↓ Browse products, search
  Product Details → Add to Cart
      ↓ View cart items
  Shopping Cart (/cart)
      ↓ Review items & prices
  Checkout (/makepayment)
      ↓ Enter phone + country
  Payment Confirmation
      ↓
  View Orders (/orders) ← View order history


AUTHENTICATED USER:
──────────────────
  Login (/signin)
      ↓ Enter email & password
  Dashboard → Check if Admin?
      ↓ YES                    ↓ NO
  Admin Panel              Home Page (/)
      ↓                         ↓
  • Add Product (/addproduct)   • Shop products
  • Manage Products (/admin)    • Add to cart
  • Dashboard (/dashboard)      • Checkout
  • Charts (/chart)             • View orders


ADMIN WORKFLOW:
──────────────
  Login (/signin) - enter admin credentials
      ↓ Role = "admin" check
  Auto-redirect to Dashboard (/dashboard)
      ↓
  ┌─ Manage Products (/admin)
  │   • View all products (paginated)
  │   • Click Edit → Modify name/price/description
  │   • Click Delete → Remove product
  │   • Add new product form
  │
  ├─ View Dashboard (/dashboard)
  │   • See KPI cards: Orders, Revenue, Items, Avg Value
  │   • View recent orders table
  │
  ├─ Analytics (/chart)
  │   • View sales charts (line/bar/pie)
  │   • Chat with AI assistant about trends
  │
  └─ Logout
      ↓ Clear user from localStorage


CUSTOMER SUPPORT CHAT:
─────────────────────
  Click "💬 Chat" from any page
      ↓ Select contact (Seller, Support, Delivery)
      ↓ Type message → AI responds
      ↓ Message history persists in localStorage
      ↓ Can search contacts
```

## **PAYMENT FLOW**

```
Customer Checkout
      ↓
Enter Email & Phone Number
      ↓
System detects country from dial code
      ↓
Validate phone number format (regex)
      ↓
Display delivery fee (FREE if ≥ KES 10,000, else KES 500)
      ↓
Call API: /makepayment with phone
      ↓
M-Pesa STK Push sent to phone
      ↓
Customer enters M-Pesa PIN on their phone
      ↓
Payment confirmed → Order created
      ↓
Redirect to Orders page (/orders)
```

## **ADMIN AUTHENTICATION FLOW**

```
Sign In Page
      ↓
Submit Email & Password
      ↓
API call to /api/signin
      ↓
Response includes user object with role
      ↓
Check: user.role === "admin"?
      ├─ YES: Navigate to /dashboard ✅
      └─ NO:  Navigate to / (home)
      ↓
User object saved to localStorage
      ↓
On page refresh → RequireAdminAuth checks:
      ├─ User exists? → ✅ Continue
      ├─ user.role === "admin"? → ✅ Continue
      └─ Else → Redirect to /
```

## **COMPONENT DATA FLOW**

```
App.js (Global State)
  ├─ cart (state)
  ├─ orders (state)
  ├─ user (localStorage)
  │
  ├─ Navbar
  │   ├─ Receives: cart, user
  │   └─ Shows: Admin menu if user.role === "admin"
  │
  ├─ Routes:
  │   ├─ / (Getproduct)
  │   │   ├─ Receives: cart, setCart
  │   │   ├─ Carousel (products)
  │   │   └─ AddToCartButton (modifies cart)
  │   │
  │   ├─ /addproduct (Protected)
  │   │   └─ RequireAuth guard
  │   │
  │   ├─ /cart
  │   │   └─ Receives: cart, setCart
  │   │
  │   ├─ /makepayment
  │   │   └─ Receives: setOrders
  │   │
  │   ├─ /orders
  │   │   └─ Receives: orders
  │   │
  │   ├─ /dashboard (Admin Protected)
  │   │   ├─ RequireAdminAuth guard
  │   │   └─ Receives: orders
  │   │
  │   ├─ /chart (Admin Protected)
  │   │   ├─ RequireAdminAuth guard
  │   │   └─ Receives: orders
  │   │
  │   ├─ /admin (Admin Protected)
  │   │   ├─ RequireAdminAuth guard
  │   │   └─ Receives: orders
  │   │
  │   └─ /chat
  │       └─ ChatBox (independent)
  │
  └─ Footer
```
