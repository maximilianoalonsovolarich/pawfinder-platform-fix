export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string | null
          id: number
          pet_id: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          pet_id?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          pet_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_images: {
        Row: {
          created_at: string | null
          id: number
          image_url: string
          is_primary: boolean | null
          pet_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          image_url: string
          is_primary?: boolean | null
          pet_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          image_url?: string
          is_primary?: boolean | null
          pet_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_images_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pets: {
        Row: {
          activity_level: string | null
          age: string | null
          breed: string | null
          created_at: string | null
          description: string | null
          gender: string | null
          good_with: string[] | null
          health: string | null
          id: number
          location: string | null
          name: string
          personality: string[] | null
          size: string | null
          status: string | null
          type: string
          updated_at: string | null
          user_id: string | null
          views_count: number | null
          approval_status: string | null
        }
        Insert: {
          activity_level?: string | null
          age?: string | null
          breed?: string | null
          created_at?: string | null
          description?: string | null
          gender?: string | null
          good_with?: string[] | null
          health?: string | null
          id?: number
          location?: string | null
          name: string
          personality?: string[] | null
          size?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
          approval_status?: string | null
        }
        Update: {
          activity_level?: string | null
          age?: string | null
          breed?: string | null
          created_at?: string | null
          description?: string | null
          gender?: string | null
          good_with?: string[] | null
          health?: string | null
          id?: number
          location?: string | null
          name?: string
          personality?: string[] | null
          size?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string | null
          views_count?: number | null
          approval_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          is_admin: boolean | null
          last_name: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          is_admin?: boolean | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
