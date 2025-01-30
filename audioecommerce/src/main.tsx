import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./Router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Router />
  </AuthProvider>
);