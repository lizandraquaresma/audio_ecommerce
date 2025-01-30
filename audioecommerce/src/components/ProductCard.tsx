import { Product } from "../services/api";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const averageRating =
        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length;

    return (
        <div className="product-card">
            <img
                src={product.img}
                alt={product.name}
                className="product-image"
                loading="lazy"
            />
            <div className="product-info">
                <h3>{product.name}</h3>
                <div className="rating">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span
                            key={index}
                            className={`star ${index < Math.round(averageRating) ? 'filled' : ''}`}
                        >
                            ★
                        </span>
                    ))}
                    <span>({product.reviews.length})</span>
                </div>
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="category">{product.category}</p>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;