export interface MenuItem {
    name: string;
    quantity: string;
}

export interface PopularItem {
    name: string;
    image: string;
    price: string;
}

export interface FoodItem {
    name: string;
    image: string;
    price: string;
}

export const menuItems: MenuItem[] = [
    { name: 'Popular', quantity: '' },
    { name: 'Special Sets', quantity: '' },
    { name: 'Burger', quantity: '' },
    { name: 'A La Carte', quantity: '' },
    { name: 'Beverage', quantity: '' },
    { name: 'Beer', quantity: '' },
];

export const popular: PopularItem[] = [
    { name: 'Burger Set A', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3328878.jpg??width=400', price: '4' },
    { name: 'Burger Set B', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3333039.jpg??width=400', price: '4.64' },
    { name: 'Big Mac', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307175.jpg??width=400', price: '4.80' },
    { name: 'Triple Beef Cheese Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307177.jpg??width=400', price: '5.20' },
    { name: 'Cheese Beef Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307171.jpg??width=400', price: '3.20' },
    { name: 'Chicken Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307176.jpg??width=400', price: '3.04' },
];

export const otherSections: Record<string, FoodItem[]> = {
    "Special Sets": [
        { name: 'Burger Set A', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3328878.jpg??width=400', price: '4' },
        { name: 'Burger Set B', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3333039.jpg??width=400', price: '4.64' },
    ],
    'Burger': [
        { name: 'Big Mac', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307175.jpg??width=400', price: '4.80' },
        { name: 'Triple Beef Cheese Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307177.jpg??width=400', price: '5.20' },
        { name: 'Cheese Beef Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307171.jpg??width=400', price: '3.20' },
        { name: 'Chicken Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307176.jpg??width=400', price: '3.04' },
        { name: 'Double Egg Cheese Beef Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307178.jpg??width=400', price: '3.36' },
        { name: 'Triple Beef Cheese Burger', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307177.jpg??width=400', price: '5.20' },
    ],
    'A La Carte': [
        { name: 'French Fries', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307179.jpg??width=400', price: '1.20' },
        { name: 'Chicken Nuggets', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307180.jpg??width=400', price: '1.20' },
        { name: 'Orleans Roasted Wings', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307184.jpg??width=400', price: '2' },
    ],
    'Beverage': [
        { name: 'Coca-Cola', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307185.jpg??width=400', price: '0.80' },
    ],
    'Beer': [
        { name: 'Cambodia Beer', image: 'https://images.deliveryhero.io/image/fd-kh/Products/3307186.jpg??width=400', price: '1.20' },
    ],
};
