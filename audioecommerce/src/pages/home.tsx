import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useProducts from "../hooks/useProducts";
// import LoadingSpinner from "../components/LoadingSpinner";
import { FiMenu } from "react-icons/fi";
import { MdHeadphones } from "react-icons/md";
import defaultAvatar from '../assets/images/default-avatar.jpg';
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";
import { useState } from "react";

export const Home = () => {
    const { products, error } = useProducts();
    const navigate = useNavigate();
    const { user } = useAuth(); // Use o hook de autenticação
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Obter categorias únicas
    const categories = ['all', ...new Set(products.map(p => p.category))] as string[];

    // Filtrar produtos por categoria
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    // if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="home-page">
            {/* App Bar */}
            <header className="app-bar">
                <div className="app-bar-content">
                    {/* Ícone do menu à esquerda */}
                    <button
                        className="icon-button"
                        onClick={() => console.log('Abrir menu')}
                        aria-label="Abrir menu"
                    >
                        <FiMenu size={24} />
                    </button>

                    {/* Logo central */}
                    <div className="app-title" onClick={() => navigate('/')}>
                        <MdHeadphones className="logo-icon" color="#0ACF83" />
                        <span>Audio</span>
                    </div>

                    {/* Avatar do usuário à direita */}
                    <div className="user-section">
                        <img
                            src={user?.photoURL || defaultAvatar}
                            alt="User avatar"
                            className="user-avatar"
                            onClick={() => navigate('/profile')}
                        />
                    </div>
                </div>
            </header>

            <main className="main-content">
                <div className="hero-section">
                    <div className="user-greeting">
                        <h1 className="welcome-title" >{user?.displayName ? `Hi, ${user.displayName}!` : 'Hi!'}</h1>
                        <p className="welcome-text">What are you looking for today?</p>
                    </div>

                    <section className="search-section">
                        <input
                            type="text"
                            placeholder="Search headphone"
                            onClick={() => navigate('/search')}
                            readOnly
                            aria-label="Open search page"
                        />
                    </section>

                </div>


                {/* Nova seção de categorias */}
                <div className="container">
                    <section className="categories-section">
                        <div className="category-buttons">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>

                        <div className="category-carousel">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={() => navigate(`/product/${product.id}`)}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};