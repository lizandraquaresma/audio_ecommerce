import { useEffect, useState } from "react";
import { Product, fetchProducts } from "../services/api";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find(product => product.id === id) || null;
  };


  return { products, loading, error, getProductById };
};

export default useProducts;