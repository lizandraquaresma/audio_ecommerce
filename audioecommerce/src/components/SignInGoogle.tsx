// components/LoginButton.tsx
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/icons/google-icon.svg";
import { auth, googleProvider } from "../services/firebase";


export const LoginButton = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error: any) {
      console.error("Erro no login:", error.message);
    }
  };

  return <button onClick={handleLogin} style={{
    backgroundColor: "transparent",
  }}><img src={googleIcon} alt="Google Logo"/> Sign up with Google</button>;
};