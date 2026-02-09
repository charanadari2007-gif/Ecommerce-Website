import { useState } from "react";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/Dashboardpage.jsx";
import CartPage from "./pages/CartPage.jsx";

import products from "./data/products.js";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // ⭐ REAL CART
  const [cartItems, setCartItems] = useState([]);

  // ⭐ PAGE CONTROL
  const [page, setPage] = useState("dashboard");

  // SIGNUP
  function handleSignUp(user) {
    setRegisteredUser({ ...user });

    // auto login
    setIsLoggedIn(true);
    setCurrentUser(user);
  }

  // LOGIN
  function handleLogin(user) {
    setIsLoggedIn(true);
    setCurrentUser({ ...user });
  }

  // LOGOUT
  function handleLogout() {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCartItems([]);
    setPage("dashboard");
  }

  // ADD TO CART
  function handleAddToCart(product) {
    setCartItems(prev => [...prev, product]);
  }

  // OPEN CART
  function openCart() {
    setPage("cart");
  }

  // BACK TO DASHBOARD
  function goToDashboard() {
    setPage("dashboard");
  }

  return (
    <div className="container">

      {!isLoggedIn ? (

        <AuthPage
          registeredUser={registeredUser}
          onSignUp={handleSignUp}
          onLogin={handleLogin}
        />

      ) : page === "cart" ? (

        <CartPage
          cartItems={cartItems}
          onBack={goToDashboard}
        />

      ) : (

        <DashboardPage
          user={currentUser}
          cartCount={cartItems.length}
          products={products}
          onAddToCart={handleAddToCart}
          onLogout={handleLogout}
          onCartClick={openCart}
        />

      )}

    </div>
  );
}
