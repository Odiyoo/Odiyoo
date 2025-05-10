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
      appointment_quotes: {
        Row: {
          appointment_id: string
          quote_id: string | null
          quote_type: string
        }
        Insert: {
          appointment_id: string
          quote_id?: string | null
          quote_type: string
        }
        Update: {
          appointment_id?: string
          quote_id?: string | null
          quote_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_quotes_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointment_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      appointment_requests: {
        Row: {
          address: string
          created_at: string
          email: string
          fullname: string
          id: string
          status: string | null
          telephone: string
        }
        Insert: {
          address: string
          created_at?: string
          email: string
          fullname: string
          id?: string
          status?: string | null
          telephone: string
        }
        Update: {
          address?: string
          created_at?: string
          email?: string
          fullname?: string
          id?: string
          status?: string | null
          telephone?: string
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
          quote_number: number
          roofing_type_id: number
          surface_in_sq_meter: number
          total_price: number
        }
        Insert: {
          address: string
          contractor_id: string
          created_at?: string
          email?: string | null
          extras_id?: string | null
          id?: string
          quote_number: number
          roofing_type_id: number
          surface_in_sq_meter: number
          total_price?: number
        }
        Update: {
          address?: string
          contractor_id?: string
          created_at?: string
          email?: string | null
          extras_id?: string | null
          id?: string
          quote_number?: number
          roofing_type_id?: number
          surface_in_sq_meter?: number
          total_price?: number
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
            referencedRelation: "dakbedekking_quote_extras"
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
          dakreiniging_prijs_per_sq_meter: number
          dakreiniging_start_price: number
          has_bankruptcy_protection: boolean | null
          has_showroom: boolean | null
          id: string
          isolatie_per_sq_meter: number
          name: string | null
          profile_image: string | null
          review_count: number | null
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
          dakreiniging_prijs_per_sq_meter?: number
          dakreiniging_start_price?: number
          has_bankruptcy_protection?: boolean | null
          has_showroom?: boolean | null
          id?: string
          isolatie_per_sq_meter?: number
          name?: string | null
          profile_image?: string | null
          review_count?: number | null
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
          dakreiniging_prijs_per_sq_meter?: number
          dakreiniging_start_price?: number
          has_bankruptcy_protection?: boolean | null
          has_showroom?: boolean | null
          id?: string
          isolatie_per_sq_meter?: number
          name?: string | null
          profile_image?: string | null
          review_count?: number | null
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
          firstname: string | null
          id: string
          lastname: string | null
        }
        Insert: {
          bank_account_nr?: string | null
          firstname?: string | null
          id: string
          lastname?: string | null
        }
        Update: {
          bank_account_nr?: string | null
          firstname?: string | null
          id?: string
          lastname?: string | null
        }
        Relationships: []
      }
      dakbedekking_quote_extras: {
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
      dakbedekking_quotes: {
        Row: {
          address: string
          contractor_id: string
          created_at: string
          dakgoten: string | null
          dakraam: string | null
          extras_id: string | null
          id: string
          insulation: string | null
          quote_number: string
          roofing_type_id: number
          surface_in_sq_meter: number
          total_price: number
        }
        Insert: {
          address: string
          contractor_id: string
          created_at?: string
          dakgoten?: string | null
          dakraam?: string | null
          extras_id?: string | null
          id?: string
          insulation?: string | null
          quote_number: string
          roofing_type_id: number
          surface_in_sq_meter: number
          total_price?: number
        }
        Update: {
          address?: string
          contractor_id?: string
          created_at?: string
          dakgoten?: string | null
          dakraam?: string | null
          extras_id?: string | null
          id?: string
          insulation?: string | null
          quote_number?: string
          roofing_type_id?: number
          surface_in_sq_meter?: number
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "dakbedekking_quotes_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dakbedekking_quotes_extras_id_fkey"
            columns: ["extras_id"]
            isOneToOne: false
            referencedRelation: "dakbedekking_quote_extras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dakbedekking_quotes_roofing_type_id_fkey"
            columns: ["roofing_type_id"]
            isOneToOne: false
            referencedRelation: "roofing_types"
            referencedColumns: ["id"]
          },
        ]
      }
      dakreiniging_quotes: {
        Row: {
          address: string
          contractor_id: string
          created_at: string
          has_aquaplan: boolean | null
          has_dakbedekking: boolean | null
          has_dakramen: boolean | null
          has_gootsystemen: boolean | null
          has_schoorsteen: boolean | null
          has_zonnepanelen: boolean | null
          id: string
          option_unknown: boolean | null
          quote_number: string
          surface_in_sq_meter: number
          total_price: number
        }
        Insert: {
          address: string
          contractor_id: string
          created_at?: string
          has_aquaplan?: boolean | null
          has_dakbedekking?: boolean | null
          has_dakramen?: boolean | null
          has_gootsystemen?: boolean | null
          has_schoorsteen?: boolean | null
          has_zonnepanelen?: boolean | null
          id?: string
          option_unknown?: boolean | null
          quote_number: string
          surface_in_sq_meter: number
          total_price?: number
        }
        Update: {
          address?: string
          contractor_id?: string
          created_at?: string
          has_aquaplan?: boolean | null
          has_dakbedekking?: boolean | null
          has_dakramen?: boolean | null
          has_gootsystemen?: boolean | null
          has_schoorsteen?: boolean | null
          has_zonnepanelen?: boolean | null
          id?: string
          option_unknown?: boolean | null
          quote_number?: string
          surface_in_sq_meter?: number
          total_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "dakreiniging_quotes_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
        ]
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
      all_quotes: {
        Row: {
          address: string | null
          contractor_id: string | null
          created_at: string | null
          dakgoten: string | null
          dakraam: string | null
          has_aquaplan: boolean | null
          has_dakbedekking: boolean | null
          has_dakramen: boolean | null
          has_gootsystemen: boolean | null
          has_schoorsteen: boolean | null
          has_zonnepanelen: boolean | null
          id: string | null
          insulation: string | null
          option_unknown: boolean | null
          quote_number: string | null
          quote_type: string | null
          roofing_type_id: number | null
          surface_in_sq_meter: number | null
          total_price: number | null
        }
        Relationships: []
      }
      customer_view: {
        Row: {
          bank_account_nr: string | null
          email: string | null
          firstname: string | null
          id: string | null
          lastname: string | null
          phone: string | null
        }
        Relationships: []
      }
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

