import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          user_id: string
          flight_number: string | null
          flight_date: string | null
          recipients: any
          upgrade_selected: boolean
          amount_paid: number
          status: 'active' | 'completed' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          flight_number?: string | null
          flight_date?: string | null
          recipients: any
          upgrade_selected?: boolean
          amount_paid: number
          status?: 'active' | 'completed' | 'refunded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          flight_number?: string | null
          flight_date?: string | null
          recipients?: any
          upgrade_selected?: boolean
          amount_paid?: number
          status?: 'active' | 'completed' | 'refunded'
          updated_at?: string
        }
      }
      boarding_passes: {
        Row: {
          id: string
          user_id: string
          message_id: string
          file_path: string
          file_name: string
          uploaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          message_id: string
          file_path: string
          file_name: string
          uploaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          message_id?: string
          file_path?: string
          file_name?: string
          uploaded_at?: string
        }
      }
    }
  }
}