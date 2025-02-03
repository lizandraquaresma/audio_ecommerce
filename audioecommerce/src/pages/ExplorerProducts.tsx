import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';
import useProducts from '../hooks/useProducts';
import { FiArrowLeft, FiShoppingCart, FiFilter } from 'react-icons/fi';
import ExploreProductCard from '../components/ExploreProductCard';
import '../styles/ExplorerProducts.css';

type SortOption = 'popularity' | 'newest' | 'oldest' | 'price-high' | 'price-low';

export const Explorer = () => {
    const { products } = useProducts();
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>('popularity');

    const categories = Array.from(new Set(products.map(p => p.category)));

    const filteredProducts = products
        .filter(product =>
            selectedCategories.length === 0 ||
            selectedCategories.includes(product.category)
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'popularity':
                    return b.popularity - a.popularity;
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'price-high':
                    return b.price - a.price;
                case 'price-low':
                    return a.price - b.price;
                default:
                    return 0;
            }
        });
    
    const sortOptions: { value: SortOption; label: string }[] = [
        { value: 'popularity', label: 'Popularity' },
        { value: 'newest', label: 'Newest' },
        { value: 'oldest', label: 'Oldest' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'price-low', label: 'Price: Low to High' },
    ];

    return (
        <div className="explore-page">
            {/* Header */}
            <header className="search-app-bar">
                <div className="app-bar-content">
                    <button className="icon-button" onClick={() => navigate('/')}>
                        <FiArrowLeft size={24} />
                    </button>
                    <div className="cart-button" onClick={() => navigate('/cart')}>
                        <FiShoppingCart size={24} color='black' />
                    </div>
                </div>
            </header>

            <main>
                <div className="explore-header">
                    <h1>All Products</h1>
                    <Dialog.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <Dialog.Trigger asChild>
                            <button className="filter-button">
                                <FiFilter size={18} /> Filter
                            </button>
                        </Dialog.Trigger>

                        <Dialog.Portal>
                            <Dialog.Overlay className="drawer-overlay" />
                            <Dialog.Content className="drawer-content">
                                <div className="drawer-header">
                                    <h2>Filters</h2>
                                    <button className="close-button" onClick={() => setIsDrawerOpen(false)}>✕</button>
                                </div>

                                <div className="filters-content">
                                    <div className="filter-section">
                                        <h3>Category</h3>
                                        <div className="category-filters">
                                            {categories.map(category => (
                                                <button
                                                    key={category}
                                                    className={`category-pill ${selectedCategories.includes(category) ? 'active' : ''}`}
                                                    onClick={() => setSelectedCategories(prev =>
                                                        prev.includes(category)
                                                            ? prev.filter(c => c !== category)
                                                            : [...prev, category]
                                                    )}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="filter-section">
                                        <h3>Sort By</h3>
                                        <div className="sort-filters">
                                            {sortOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    className={`sort-pill ${sortBy === option.value ? 'active' : ''}`}
                                                    onClick={() => setSortBy(option.value)}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button className="apply-button" onClick={() => setIsDrawerOpen(false)}>
                                        Apply Filters
                                    </button>
                                </div>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </div>

                <section className="explore-products-grid">
                    {filteredProducts.map(product => (
                        <ExploreProductCard
                            key={product.id}
                            product={product}
                            onClick={() => navigate(`/product/${product.id}`)}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
};
