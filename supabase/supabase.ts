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
      plants: {
        Row: {
          created_at: string
          health: Database["public"]["Enums"]["plant_health"]
          id: string
          location: string | null
          name: string
        }
        Insert: {
          created_at?: string
          health?: Database["public"]["Enums"]["plant_health"]
          id?: string
          location?: string | null
          name: string
        }
        Update: {
          created_at?: string
          health?: Database["public"]["Enums"]["plant_health"]
          id?: string
          location?: string | null
          name?: string
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
      plant_health: "great" | "ok" | "sick"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
