export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          created_at: string | null;
          game: string | null;
          id: number;
        };
        Insert: {
          created_at?: string | null;
          game?: string | null;
          id?: number;
        };
        Update: {
          created_at?: string | null;
          game?: string | null;
          id?: number;
        };
      };
      posts: {
        Row: {
          content: string;
          created_at: string | null;
          game: string | null;
          id: string;
          title: string;
          user_id: string | null;
          username: string | null;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          game?: string | null;
          id?: string;
          title: string;
          user_id?: string | null;
          username?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string | null;
          game?: string | null;
          id?: string;
          title?: string;
          user_id?: string | null;
          username?: string | null;
        };
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string | null;
          username?: string | null;
        };
      };
      replies: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          parent_reply_id: string | null;
          post_id: string | null;
          user_id: string | null;
          username: string | null;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          parent_reply_id?: string | null;
          post_id?: string | null;
          user_id?: string | null;
          username?: string | null;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          parent_reply_id?: string | null;
          post_id?: string | null;
          user_id?: string | null;
          username?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
