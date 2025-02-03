import { FiArrowRight } from "react-icons/fi";
import { Product } from "../services/api";
import "../styles/ProductCard.css";

interface ProductCardProps {
    product: Product;
    onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {

    return (
        <div
            className="home-product-card"
            onClick={onClick}
            role="button"
            tabIndex={0}
        >
            <div className="home-product-info">
                <h3>{product.name}</h3>
                <button className="home-add-to-cart">Shop now <FiArrowRight/></button>
            </div>
            <img
                src={product.img}
                alt={product.name}
                className="home-product-image"
                loading="lazy"
            />


        </div>
    );
};

export default ProductCard;