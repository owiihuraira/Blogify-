export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  status: "draft" | "published";
  author_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}