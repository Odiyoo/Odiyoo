export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      cold_quote_extras: {
        Row: {
          has_dak_isolatie: boolean
          has_dakgoten: boolean
          has_dakramen: boolean
          has_gevel_bekleding: boolean
          has_zonnepanelen: boolean
          id: string
        }
        Insert: {
          has_dak_isolatie?: boolean
          has_dakgoten?: boolean
          has_dakramen?: boolean
          has_gevel_bekleding?: boolean
          has_zonnepanelen?: boolean
          id?: string
        }
        Update: {
          has_dak_isolatie?: boolean
          has_dakgoten?: boolean
          has_dakramen?: boolean
          has_gevel_bekleding?: boolean
          has_zonnepanelen?: boolean
          id?: string
        }
        Relationships: []
      }
      cold_quotes: {
        Row: {
          address: string
          contractor_id: string
          created_at: string
          email: string | null
          extras_id: string | null
          id: string
          roofing_type_id: number
          surface_in_sq_meter: number
        }
        Insert: {
          address: string
          contractor_id: string
          created_at?: string
          email?: string | null
          extras_id?: string | null
          id: string
          roofing_type_id: number
          surface_in_sq_meter: number
        }
        Update: {
          address?: string
          contractor_id?: string
          created_at?: string
          email?: string | null
          extras_id?: string | null
          id?: string
          roofing_type_id?: number
          surface_in_sq_meter?: number
        }
        Relationships: [
          {
            foreignKeyName: "cold_quotes_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_quotes_extras_id_fkey"
            columns: ["extras_id"]
            isOneToOne: false
            referencedRelation: "cold_quote_extras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cold_quotes_roofing_type_id_fkey"
            columns: ["roofing_type_id"]
            isOneToOne: false
            referencedRelation: "roofing_types"
            referencedColumns: ["id"]
          },
        ]
      }
      contractor_project_images: {
        Row: {
          contractor_id: string
          created_at: string
          id: number
          image_path: string
        }
        Insert: {
          contractor_id: string
          created_at?: string
          id?: number
          image_path: string
        }
        Update: {
          contractor_id?: string
          created_at?: string
          id?: number
          image_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "contractor_project_images_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
        ]
      }
      contractors: {
        Row: {
          afbraakwerken_per_sq_meter: number
          bankaccount_nr: string | null
          btw_nr: string | null
          city: string | null
          company_start_year: number | null
          created_at: string
          dakbedekking_per_sq_meter: number
          has_bankruptcy_protection: boolean | null
          has_showroom: boolean | null
          id: string
          isolatie_per_sq_meter: number
          name: string | null
          profile_image: string | null
          status: boolean
          timmerwerken_per_sq_meter: number
          warranty_labor_in_years: number
          warranty_material_in_years: number
        }
        Insert: {
          afbraakwerken_per_sq_meter?: number
          bankaccount_nr?: string | null
          btw_nr?: string | null
          city?: string | null
          company_start_year?: number | null
          created_at?: string
          dakbedekking_per_sq_meter?: number
          has_bankruptcy_protection?: boolean | null
          has_showroom?: boolean | null
          id: string
          isolatie_per_sq_meter?: number
          name?: string | null
          profile_image?: string | null
          status?: boolean
          timmerwerken_per_sq_meter?: number
          warranty_labor_in_years?: number
          warranty_material_in_years?: number
        }
        Update: {
          afbraakwerken_per_sq_meter?: number
          bankaccount_nr?: string | null
          btw_nr?: string | null
          city?: string | null
          company_start_year?: number | null
          created_at?: string
          dakbedekking_per_sq_meter?: number
          has_bankruptcy_protection?: boolean | null
          has_showroom?: boolean | null
          id?: string
          isolatie_per_sq_meter?: number
          name?: string | null
          profile_image?: string | null
          status?: boolean
          timmerwerken_per_sq_meter?: number
          warranty_labor_in_years?: number
          warranty_material_in_years?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          bank_account_nr: string | null
          id: string
        }
        Insert: {
          bank_account_nr?: string | null
          id: string
        }
        Update: {
          bank_account_nr?: string | null
          id?: string
        }
        Relationships: []
      }
      roofing_types: {
        Row: {
          color: string
          created_at: string
          id: number
          type: string
        }
        Insert: {
          color: string
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          color?: string
          created_at?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      user_info: {
        Row: {
          created_at: string
          id: string
          role_id: number
        }
        Insert: {
          created_at?: string
          id: string
          role_id: number
        }
        Update: {
          created_at?: string
          id?: string
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_info_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "user_roles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: number
          role: string
        }
        Insert: {
          created_at?: string
          id?: number
          role: string
        }
        Update: {
          created_at?: string
          id?: number
          role?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

