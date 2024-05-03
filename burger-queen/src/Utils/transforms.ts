import { Product } from "src/Models/Produto";

export function formatProducts(apiData: any): Product{
  const urlAPI = 'https://burger-queen-api-mock.up.railway.app';

  return {
    id: apiData.id,
    name: apiData.name,
    price: apiData.price,
    image: apiData.image ? `${urlAPI}${apiData.image}` : 'https://raw.githubusercontent.com/Laboratoria/burger-queen-api-mock/main/resources/images/sandwich.png', // Corrigir o caminho para "images" em vez de "image"
    tipo: apiData.type,
    // datePedido: apiData.dateEntry ? new Date(apiData.dateEntry).getFullYear().toString() : 'Desconhecido', // Corrigir para "dateEntry" em vez de "release_date"
  };
}
