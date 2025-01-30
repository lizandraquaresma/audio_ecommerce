import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmail } from "../services/firebase";
import { LoginButton } from "./SignInGoogle";
import "../styles/AuthForm.module..css";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmail(email, password);
            navigate(from, { replace: true });
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
                <form onSubmit={handleEmailLogin}>
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
                    <p><Link to="/forgot-password">Forgot Password?</Link></p>

                    <button type="submit">Sign In</button>
                </form>

                <LoginButton />

                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>

            <div className="auth-navigation">
                <p>
                    Didn’t have any account? <Link to="/signup">Sign Up here</Link>
                </p>
            </div>

        </div>
    );
};