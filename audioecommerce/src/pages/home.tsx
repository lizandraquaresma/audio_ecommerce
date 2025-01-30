import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import { useAuth } from "../contexts/AuthContext"; // Adicione esta importação
// import LoadingSpinner from "../components/LoadingSpinner";
import defaultAvatar from '../assets/default-avatar.png'; // Crie este asset

export const Home = () => {
    const { products, error } = useProducts();
    const navigate = useNavigate();
    const { user } = useAuth(); // Use o hook de autenticação

    // if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="home-page">
            <section className="home-header">
                <div className="user-greeting">
                    <img
                        src={user?.photoURL || defaultAvatar}
                        alt="User avatar"
                        className="user-avatar"
                    />
                    <div>
                        <h2>{user?.displayName ? `Hi, ${user.displayName}` : 'Hi!'}</h2>
                        <p className="welcome-text">What are you looking for today?</p>
                    </div>
                </div>
            </section>

            <section className="search-section">
                <input
                    type="text"
                    placeholder="Search products..."
                    onClick={() => navigate('/search')}
                    readOnly // Torna o campo clicável sem permitir digitação
                    aria-label="Open search page"
                />
            </section>

            <section className="products-grid">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => navigate(`/product/${product.id}`)}
                    />
                ))}
            </section>
        </div>
    );
};