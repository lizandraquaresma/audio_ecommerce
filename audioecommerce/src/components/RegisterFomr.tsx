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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>Audio</h1>
        <p>It's modular and designed to last</p>
      </div>

      <div className="auth-form">
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
          <button type="submit">Sign Up</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

      </div>

      <div className="auth-navigation">
        <p>
          If you have an account? <Link to="/login">Sign In here</Link>
        </p>
      </div>
    </div>
  );
};