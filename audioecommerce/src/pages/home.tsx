import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useProducts from "../hooks/useProducts";
// import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdHeadphones } from "react-icons/md";
import defaultAvatar from '../assets/images/default-avatar.jpg';
import ProductCard from "../components/ProductCard";
import "../styles/Home.css";

export const Home = () => {
    const { products, error } = useProducts();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...new Set(products.map(p => p.category))] as string[];

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    // if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    const featuredProducts = products.slice(0, 5);

    return (
        <div className="home-page">
            <header className="app-bar">
                <div className="app-bar-content">
                    <button
                        className="icon-button"
                        onClick={() => console.log('Abrir menu')}
                        aria-label="Abrir menu"
                    >
                        <FiMenu size={24} />
                    </button>

                    <div className="app-title" onClick={() => navigate('/')}>
                        <MdHeadphones className="logo-icon" color="#0ACF83" />
                        <span>Audio</span>
                    </div>

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


                    <section className="featured-section">
                        <div className="home-section-header">
                            <h2>Featured Products</h2>
                            <button
                                className="see-all-btn"
                                onClick={() => navigate('/explore')}
                            >
                                See All
                            </button>
                        </div>

                        <div className="featured-carousel">
                            {featuredProducts.map(product => (
                                <div key={product.id} className="carousel-item" onClick={() => navigate(`/product/${product.id}` )}>
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        className="feature-product-image"
                                    />
                                    <div className="feature-product-info">
                                        <h3>{product.name}</h3>

                                        <p className="price">${product.price.toFixed(2)}</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};