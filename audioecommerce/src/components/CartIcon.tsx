// src/components/CartIcon.tsx
import { useCart } from "../contexts/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const CartIcon = () => {
    const { totalItems } = useCart();
    const navigate = useNavigate();

    return (
        <div className="cart-icon" onClick={() => navigate("/cart")}>
            <FiShoppingCart size={24} color="black"/>
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
        </div>
    );
};