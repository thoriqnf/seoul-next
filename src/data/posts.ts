export interface Post {
  id: string;
  category: string;
  title: string;
  body: string;
  author: string;
  date: string;
}

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    category: "tech",
    title: "Understanding Next.js App Router",
    body: "Next.js App Router introduced a new model for building applications using React features like Server Components, Suspense, and more. It simplifies layout management, loading states, error handling, and co-locating styles, tests, and components.",
    author: "Jane Doe",
    date: "June 1, 2026",
  },
  {
    id: "2",
    category: "tech",
    title: "TypeScript Deep Dive: Generics",
    body: "Generics allow you to write reusable, type-safe components and functions that work over a variety of types rather than a single one. This deep dive covers generic constraints, utility types, and conditional types in TypeScript.",
    author: "John Smith",
    date: "June 2, 2026",
  },
  {
    id: "1",
    category: "cooking",
    title: "Perfect Homemade Neapolitan Pizza",
    body: "To make authentic Neapolitan pizza at home, you need three key components: high-hydration 00 flour dough, sweet San Marzano tomato sauce, and fresh mozzarella cheese baked at the highest temperature your oven can reach, ideally on a pizza stone.",
    author: "Chef Mario",
    date: "May 25, 2026",
  },
  {
    id: "2",
    category: "cooking",
    title: "10-Minute Creamy Garlic Pasta",
    body: "This quick garlic pasta is the ultimate comfort food. Sauté minced garlic in butter and olive oil, add heavy cream and freshly grated Parmesan cheese, toss with al dente fettuccine, and garnish with chopped fresh parsley.",
    author: "Elena Rostova",
    date: "May 28, 2026",
  },
  {
    id: "1",
    category: "lifestyle",
    title: "Minimizing Stress: A Practical Guide",
    body: "Decluttering your schedule is just as important as decluttering your physical space. Practice mindfulness, set healthy boundaries at work, sleep at least 7-8 hours, and spend at least 15 minutes in nature every day to reduce stress levels.",
    author: "Sarah Green",
    date: "May 30, 2026",
  },
  {
    id: "2",
    category: "lifestyle",
    title: "The Art of Slow Living",
    body: "Slow living is a lifestyle choice encouraging a slower approach to aspects of everyday life. It involves doing things at the right speed, savoring hours and minutes rather than just counting them, and focusing on quality over quantity.",
    author: "David Thorne",
    date: "June 1, 2026",
  },
];
