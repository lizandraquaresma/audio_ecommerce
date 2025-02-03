// src/pages/ShoppingCart.tsx
import { FiArrowLeft, FiDelete, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import "../styles/ShoppingCart.css";

export const ShoppingCart = () => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
    } = useCart();

    const navigate = useNavigate();

    return (
        <div className="shopping-cart">
            <header className="cart-app-bar">
                <div className="cart-app-bar-content">
                    <button className="icon-button" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={24} />
                    </button>
                    <h1>Shopping Cart</h1>
                    <button className="icon-button" onClick={() => clearCart()}>
                        <FiDelete size={24} />
                    </button>
                </div>
            </header>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <button onClick={() => navigate("/")}>Continue Shopping</button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    onClick={() => navigate(`/product/${item.id}`)}
                                />
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className="controls">
                                        <div className="quantity-controls">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                <FiMinus size={24} color="black" />
                                            </button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                <FiPlus size={24} color="black" />

                                            </button>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <FiTrash2 size={24} color="black" />
                                        </button>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>

                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="total-items">
                                    <p>Total {totalItems} { totalItems <= 1 ? 'item' : 'itens'}</p>
                            </div>


                            <p className="cart-price">${totalPrice.toFixed(2)}</p>
                        </div>

                        <div className="cart-actions">
                            <button
                                className="checkout-btn"
                                onClick={() => navigate("/checkout")}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};