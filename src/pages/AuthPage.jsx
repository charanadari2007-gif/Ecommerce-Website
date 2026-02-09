import { useState } from "react";
import SignUpModal from "../components/SignUpModal.jsx";

export default function AuthPage({ registeredUser, onSignUp, onLogin }) {
  // Controlled form state (Sign In)
  const [form, setForm] = useState({ email: "", password: "" });

  // Stores validation errors per field (email/password)
  const [errors, setErrors] = useState({});

  // Controls whether SignUp modal is visible
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Info message box (success/failure messages)
  const [infoMessage, setInfoMessage] = useState("");

  // Event: input change for Sign In
  function handleChange(e) {
    const { name, value } = e.target;

    // Immutability: create new object
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error while typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // Validation logic for Sign In
  function validateSignIn(values) {
    const nextErrors = {};

    if (!values.email.trim()) nextErrors.email = "Email is required";
    else if (!values.email.includes("@")) nextErrors.email = "Email must contain @";

    if (!values.password.trim()) nextErrors.password = "Password is required";
    else if (values.password.length < 6)
      nextErrors.password = "Password must be at least 6 characters";

    return nextErrors;
  }

  // Event: form submit for Sign In
  function handleSubmit(e) {
    e.preventDefault(); // Stop full page reload (SPA behavior)

    const nextErrors = validateSignIn(form);
    setErrors(nextErrors);

    // If errors exist, stop further execution
    if (Object.keys(nextErrors).length > 0) return;

    // Frontend-only login logic:
    // Allow login using:
    // 1) the registered user from Sign Up OR
    // 2) a demo account (hard-coded)
    const demoEmail = "demo@shop.com";
    const demoPassword = "demo123";

    const canLoginWithRegistered =
      registeredUser &&
      form.email === registeredUser.email &&
      form.password === registeredUser.password;

    const canLoginWithDemo = form.email === demoEmail && form.password === demoPassword;

    if (!canLoginWithRegistered && !canLoginWithDemo) {
      setInfoMessage("Invalid credentials. Try demo@shop.com / demo123 or Sign Up first.");
      return;
    }

    // Success → call parent handler to switch to dashboard
    onLogin({ email: form.email });
  }

  // Event: open sign up modal
  function openSignUp() {
    setIsSignUpOpen(true);
    setInfoMessage("");
  }

  // Event: close sign up modal
  function closeSignUp() {
    setIsSignUpOpen(false);
  }

  // Called by SignUpModal on successful signup
  function handleSignUpSuccess(user) {
    // Save new user in parent (App)
    onSignUp(user);

    // Show success message on Auth page
    setInfoMessage("✅ Sign-up successful! Now login using your email & password.");

    // UX: Pre-fill email, clear password
    setForm((prev) => ({ ...prev, email: user.email, password: "" }));

    // Close modal
    setIsSignUpOpen(false);
  }

  return (
    <div className="authPage">
      <header className="brandHeader">
        <div className="brandLogo">🛒</div>
        <div>
          <h1 className="brandTitle">ShopEZ</h1>
          <p className="brandTag">Frontend-only Ecommerce Demo (React + Vite)</p>
        </div>
      </header>

      <div className="authGrid">
        {/* LEFT CARD: SIGN IN */}
        <section className="card">
          <h2 className="cardTitle">Sign In</h2>

          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              Email
              <input
                className={`input ${errors.email ? "inputError" : ""}`}
                type="email"
                name="email"
                value={form.email}       // Controlled value
                onChange={handleChange} // Event handler
                placeholder="demo@shop.com"
              />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </label>

            <label className="label">
              Password
              <input
                className={`input ${errors.password ? "inputError" : ""}`}
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="demo123"
              />
              {errors.password && <span className="errorText">{errors.password}</span>}
            </label>

            <button className="btnPrimary" type="submit">
              Login
            </button>

            <p className="hint">
              Demo account: <b>demo@shop.com</b> / <b>demo123</b>
            </p>

            {infoMessage && <div className="infoBox">{infoMessage}</div>}
          </form>
        </section>

        {/* RIGHT CARD: SIGN UP CTA */}
        <section className="card cardAlt">
          <h2 className="cardTitle">New here?</h2>
          <p className="text">
            Create an account to continue. (No backend — only React state validation demo.)
          </p>

          <button className="btnOutline" onClick={openSignUp}>
            Sign Up
          </button>

          {/* Conditional rendering:
              SignUpModal only appears when isOpen=true */}
          <SignUpModal
            isOpen={isSignUpOpen}
            onClose={closeSignUp}
            onSuccess={handleSignUpSuccess}
          />
        </section>
      </div>
    </div>
  );
}

