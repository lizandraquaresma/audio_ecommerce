// components/RequireAuth.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Carregando...</div>; // Tela de carregamento
  }

  if (!user) {
    // Redireciona para /login, guardando a rota atual
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};