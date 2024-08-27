

export interface Basket
{
    id: number;
    buyerId: string;
    items: BasketItem[];
}

interface BasketItem {
    productId: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    brand: string;
    type: string;
    quantity: number;
}