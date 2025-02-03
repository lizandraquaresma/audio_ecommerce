// src/pages/Search.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
// import LoadingSpinner from '../components/LoadingSpinner';
import '../styles/Search.css';
import { Product, Review } from '../services/api';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

export const Search = () => {
    const { products, error } = useProducts();
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [popularProducts, setPopularProducts] = useState<Product[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initialSearch = params.get('q') || '';
        setSearchTerm(initialSearch);
    }, [location.search]);

    useEffect(() => {
        if (products.length > 0) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const popular = [...products]
                .sort((a, b) => b.popularity - a.popularity)
                .slice(0, 3);

            if (!searchTerm.trim()) { setFilteredProducts([]); } // Não mostrar nada se o campo estiver vazio
            else { setFilteredProducts(filtered); }
            setPopularProducts(popular);
        }
    }, [products, searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        navigate(`?q=${encodeURIComponent(value)}`, { replace: true });
    };

    // if (loading) return <LoadingSpinner />;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="search-page">
            <header className="search-app-bar">
                <div className="app-bar-content">
                    <button
                        className="icon-button"
                        onClick={() => navigate('/')}>
                        <FiArrowLeft size={24} />
                    </button>

                    <div className="app-title" onClick={() => navigate('/')}>
                        <span>Search</span>
                    </div>

                    <div className="cart-button" onClick={() => navigate('/cart')}>
                        <FiShoppingCart size={24} color='black' />

                    </div>
                </div>
            </header>

            <main>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search headphones..."
                        value={searchTerm}
                        onChange={handleSearch}
                        autoFocus
                        aria-label="Search products"
                        className="search-input"
                    />
                </div>

                <section aria-labelledby="search-results-heading">
                    <div className="products-grid" role="list">
                        {filteredProducts.map(product => (
                            <div
                                key={product.id}
                                className="popular-card"
                                role="button"
                                tabIndex={0}
                                onClick={() => navigate(`/product/${product.id}`)}
                                onKeyPress={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
                            >
                                <img className="popular-product-image"
                                    src={product.img}
                                    alt={product.name}
                                    loading="lazy"
                                />
                                <div className="popular-product-info">
                                    <h3>{product.name}</h3>
                                    <span className="search-price">${product.price.toFixed(2)}</span>
                                    <div className="popularity">
                                        <span className="rating">
                                            ⭐ {calculateAverageRating(product.reviews)}
                                        </span>
                                        <span className="reviews">
                                            {product.reviews.length} Reviews </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="popular-products">
                    <h3>Popular product</h3>

                    <div className="popular-list">
                        {popularProducts.map((product) => (
                            <div
                                key={product.id}
                                className="popular-card"
                                role="button"
                                tabIndex={0}
                                onClick={() => navigate(`/product/${product.id}`)}
                                onKeyPress={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
                            >
                                <img className="popular-product-image"
                                    src={product.img}
                                    alt={product.name}
                                    loading="lazy"
                                />
                                <div className="popular-product-info">
                                    <h3>{product.name}</h3>
                                    <span className="price">${product.price.toFixed(2)}</span>
                                    <div className="popularity">
                                        <span className="rating">
                                            ⭐ {calculateAverageRating(product.reviews)}
                                        </span>
                                        <span className="reviews">
                                            {product.reviews.length} Reviews </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

const calculateAverageRating = (reviews: Review[]) => {
    return (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
};