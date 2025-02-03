import { Product } from "../services/api";
import "../styles/ExploreProductCard.css";

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ExploreProductCard = ({ product, onClick }: ProductCardProps) => {
    const averageRating =
        product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length;

    return (
        <div
            className="explore-product-card"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className="explore-product-info">
                <img
                    src={product.img}
                    alt={product.name}
                    className="explore-product-image"
                    loading="lazy"
                />
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
                <div className="rating">
                    <span className={`star`}>★ {averageRating.toFixed(1)}</span>
                    <span>{product.reviews.length} Reviews</span>

                </div>
            </div>


        </div>
    );
};

export default ExploreProductCard;