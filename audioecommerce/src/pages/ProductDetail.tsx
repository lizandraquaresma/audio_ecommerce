import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import useProducts from '../hooks/useProducts';
import '../styles/ProductDetails.css';
import { FiArrowLeft } from 'react-icons/fi';
import { CartIcon } from '../components/CartIcon';

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<'overview' | 'features'>('overview');

    const product = products.find(p => p.id === id);

    const suggestedProducts = products
        .filter(p => p.id !== id)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);

    if (!product) {
        return <div className="error">Product not found</div>;
    }

    return (
        <div className="product-detail">
            <header className="search-app-bar">
                <div className="app-bar-content">
                    <button className="icon-button" onClick={() => navigate(-1)}>
                        <FiArrowLeft size={24} />
                    </button>
                    <CartIcon />
                </div>
            </header>

            <main>
                <div className="details-main-section">
                    <p className="details-price">${product.price.toFixed(2)}</p>
                    <h1>{product.name}</h1>

                    <div className="tab-buttons">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
                            onClick={() => setActiveTab('features')}
                        >
                            Features
                        </button>
                    </div>
                </div>

                {activeTab === 'overview' ? (
                    <div className="details-image-gallery">
                        <img
                            src={product.img}
                            alt={product.name}
                            className="details-main-image"
                        />
                    </div>
                ) : (
                    <div className="details-product-info">
                        <p className="details-description">{product.details}</p>
                    </div>
                )}

                <section className="details-reviews-section">
                    <h2>Reviews ({product.reviews.length})</h2>
                    <div className="details-reviews-list">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="details-review-card">
                                <img src="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=" alt="user-icon" />
                                <div className='details-review-content'>
                                    <div className="details-review-header">
                                        <span className="user">{review.userName}</span>
                                        <div className="details-rating">
                                            {Array(review.rating).fill(0).map((_, i) => (
                                                <span key={i} className="star filled">★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="comment">{review.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="suggested-products">
                    <div className="section-header">
                        <h2>Another Products</h2>
                        <button
                            className="see-all-btn"
                            onClick={() => navigate('/explore')}
                        >
                            See All
                        </button>
                    </div>
                    <div className="featured-carousel">
                        {suggestedProducts.map(product => (
                            <div key={product.id} className="carousel-item" onClick={() => navigate(`/product/${product.id}`)}>
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

                <button
                    className="add-to-cart-btn"
                    onClick={() => {
                        addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.img
                        });
                        navigate('/cart');
                    }}
                >
                    Add to Cart
                </button>
            </main>
        </div>
    );
};
