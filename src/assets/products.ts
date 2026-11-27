export type Product = {
  id: string
  name: string
  category: string
  description: string
  price: number
  stock: number
}

export const PRODUCTS: Product[] = [
  {
    id: 'espresso',
    name: 'Espresso',
    category: 'Beverages',
    description: 'Double shot house blend',
    price: 3.5,
    stock: 42,
  },
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    category: 'Beverages',
    description: 'Whole milk, cold drip',
    price: 4.75,
    stock: 28,
  },
  {
    id: 'croissant',
    name: 'Croissant',
    category: 'Bakery',
    description: 'All-butter flaky French',
    price: 3.75,
    stock: 14,
  },
  {
    id: 'blueberry-muffin',
    name: 'Blueberry Muffin',
    category: 'Bakery',
    description: 'Fresh berries, crumble',
    price: 4.25,
    stock: 18,
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'Hot Food',
    description: 'Sourdough, chili flakes',
    price: 8.5,
    stock: 9,
  },
  {
    id: 'sparkling-water',
    name: 'Sparkling Water',
    category: 'Beverages',
    description: 'Mineral, lime 330ml',
    price: 2.5,
    stock: 35,
  },
  {
    id: 'breakfast-burrito',
    name: 'Breakfast Burrito',
    category: 'Hot Food',
    description: 'Egg, cheddar, black beans',
    price: 7.25,
    stock: 12,
  },
  {
    id: 'matcha-green-tea',
    name: 'Matcha Green Tea',
    category: 'Beverages',
    description: 'Ceremonial grade, oat',
    price: 5.25,
    stock: 22,
  },
]
