import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/LoginForm";
import { RegisterForm } from "./components/RegisterFomr";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./pages/home";
// import { Profile } from "./pages/Profile";
import { Explorer } from "./pages/ExplorerProducts";
import { Search } from "./pages/Search";
import { ProductDetail } from './pages/ProductDetail';
import { ShoppingCart } from './pages/ShoppingCart';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />

        {/* Rotas protegidas */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/search"
          element={
            <RequireAuth>
              <Search />
            </RequireAuth>
          }
        />
        <Route path="/explore" element={<RequireAuth><Explorer /></RequireAuth>} />
        <Route path="/product/:id" element={<RequireAuth><ProductDetail /></RequireAuth>} />
        <Route path="/cart" element={<RequireAuth><ShoppingCart /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;