-- Create tables for the flight messaging service

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Messages table to store flight messages
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  flight_number TEXT,
  flight_date DATE,
  recipients JSONB NOT NULL,
  upgrade_selected BOOLEAN DEFAULT false,
  amount_paid INTEGER NOT NULL,
  status TEXT CHECK (status IN ('active', 'completed', 'refunded')) DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Boarding passes table to store uploaded files
CREATE TABLE IF NOT EXISTS public.boarding_passes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message_id UUID REFERENCES public.messages(id) ON DELETE CASCADE NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row-Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boarding_passes ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for messages
CREATE POLICY "Users can view own messages" ON public.messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages" ON public.messages
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own messages" ON public.messages
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for boarding passes
CREATE POLICY "Users can view own boarding passes" ON public.boarding_passes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own boarding passes" ON public.boarding_passes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own boarding passes" ON public.boarding_passes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own boarding passes" ON public.boarding_passes
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage bucket for boarding passes
INSERT INTO storage.buckets (id, name, public) 
VALUES ('boarding-passes', 'boarding-passes', false);

-- Create storage policies
CREATE POLICY "Users can upload their own boarding passes" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'boarding-passes' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own boarding passes" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'boarding-passes' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own boarding passes" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'boarding-passes' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function on user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();