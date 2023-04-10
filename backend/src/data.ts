
export const sample_foods: any[] = [
  {
    food_id:'1',
    food_name: 'Pizza Pepperoni',
    cookTime: '10-20',
    price: 10000,
    favorite: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/food-1.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
  {
    food_id:'2',
    food_name: 'Meatball',
    price: 20000,
    cookTime: '20-30',
    favorite: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/food-2.jpg',
    tags: ['SlowFood', 'Lunch'],
  },
  {
    food_id:'3',
    food_name: 'Hamburger',
    price: 5,
    cookTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.4,
    imageUrl: 'assets/food-3.jpg',
    tags: ['FastFood', 'Hamburger'],
  },
  {
    food_id:'4',
    food_name: 'Fried Potatoes',
    price: 2,
    cookTime: '15-20',
    favorite: true,
    origins: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'assets/food-4.jpg',
    tags: ['FastFood', 'Fry'],
  },
  {
    food_id:'5',
    food_name: 'Chicken Soup',
    price: 11,
    cookTime: '40-50',
    favorite: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/food-5.jpg',
    tags: ['SlowFood', 'Soup'],
  },
  {
    food_id:'6',
    food_name: 'Vegetables Pizza',
    price: 9,
    cookTime: '40-50',
    favorite: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/food-6.jpg',
    tags: ['FastFood', 'Pizza', 'Lunch'],
  },
]

export const sample_tags: any[] = [
  {
    "category_id": 1,
    "category_name": "kem",
    "created_at": "2023-03-30T15:06:40.000Z",
    "updated_at": "2023-03-30T15:06:40.000Z"
    },
    {
    "category_id": 2,
    "category_name": "Nước uống",
    "created_at": "2023-03-30T15:06:40.000Z",
    "updated_at": "2023-03-30T15:06:40.000Z"
    },
    {
    "category_id": 3,
    "category_name": "Cafe",
    "created_at": "2023-03-30T15:06:40.000Z",
    "updated_at": "2023-03-30T15:06:40.000Z"
    },
    {
    "category_id": 4,
    "category_name": "Cơm Tấm",
    "created_at": "2023-03-30T15:06:40.000Z",
    "updated_at": "2023-03-30T15:06:40.000Z"
    }
]


export const sample_users: any[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "Jane@gmail.com",
    password: "12345",
    address: "Shanghai",
    isAdmin: false,
  },
];