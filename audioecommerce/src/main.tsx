import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./Router";
import "./index.css";
import { CartProvider } from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CartProvider><Router /></CartProvider>
  </AuthProvider>
);