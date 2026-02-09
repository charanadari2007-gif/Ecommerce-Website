export default function CartPage({ cartItems, onBack }) {
  // calculate total
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="dashPage">
      
      <header className="dashHeader">
        <h2 className="dashTitle">Your Cart 🛒</h2>

        <button className="btnOutline" onClick={onBack}>
          ← Back to Dashboard
        </button>
      </header>

      <section className="card">

        {cartItems.length === 0 ? (
          <h3>Your cart is empty 😢</h3>
        ) : (
          <>
            <div className="productGrid">
              {cartItems.map((item, index) => (
                <div key={index} className="productCard">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>
                </div>
              ))}
            </div>

            <h2 style={{marginTop:"30px"}}>
              Total: ₹ {total}
            </h2>
          </>
        )}

      </section>
    </div>
  );
}
