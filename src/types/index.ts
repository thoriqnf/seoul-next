export interface NewsArticle {
  id: string;
  title: string;
  body: string;
  tags: string[];
  views: number;
  userId: number;
  image?: string;
  author: string;
  authorImage?: string;
  timeAgo: string;
  verified: boolean;
}

export interface NewsComment {
  id: string;
  body: string;
  postId: number;
  user: {
    id: number;
    username: string;
    fullName?: string;
  };
}

export interface BreakingNews {
  title: string;
  timestamp: string;
}

export interface ArticleCardProps {
  article: NewsArticle;
  isHero?: boolean;
}

export interface TrendingSidebarProps {
  articles: NewsArticle[];
}

export interface CommentsSectionProps {
  postId: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  role: "admin" | "editor" | "user";
}

export interface SessionData {
  user: AuthUser;
  token: string;
}

