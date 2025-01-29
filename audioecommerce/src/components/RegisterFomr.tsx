import { useState } from "react";
import { signUpWithEmail } from "../services/firebase";
import { Link, useNavigate } from "react-router-dom";
import "../styles/AuthForm.module..css";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      navigate("/"); 
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Criar Conta</button>
      </form>
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <p>
        Já tem conta? <Link to="/login">Faça login</Link>
      </p>
    </div>
  );
};