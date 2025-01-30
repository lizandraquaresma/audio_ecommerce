import axios from "axios";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  details: string;
  img: string;
  reviews: Review[];
  popularity: number;
  createdAt: string;
}

export interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  postedAt: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<Product[]>(
      "https://run.mocky.io/v3/e5714856-f304-4a2c-b5df-2e70b97135d5"
    );
    
    if (!Array.isArray(response.data)) {
      throw new Error("Formato inválido de dados da API");
    }
    
    return response.data.map(product => ({
      ...product,
      price: Number(product.price.toFixed(2)) 
    }));
    
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Falha ao carregar produtos");
  }
};