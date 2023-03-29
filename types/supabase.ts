
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          content: string
          post_id: string
          response_json: Json | null
          title: string
          user_id: string
        }
        Insert: {
          content: string
          post_id: string
          response_json?: Json | null
          title: string
          user_id: string
        }
        Update: {
          content?: string
          post_id?: string
          response_json?: Json | null
          title?: string
          user_id?: string
        }
      }
      responses: {
        Row: {
          content: string
          post_id: string
          response_id: string
          user_id: string
        }
        Insert: {
          content: string
          post_id: string
          response_id: string
          user_id: string
        }
        Update: {
          content?: string
          post_id?: string
          response_id?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
