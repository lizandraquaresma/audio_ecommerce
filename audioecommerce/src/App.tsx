import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        { }
        <div className="app">
          { }
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;