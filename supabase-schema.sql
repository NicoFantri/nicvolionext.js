-- =============================================
-- JALANKAN SEMUA SQL INI DI SUPABASE SQL EDITOR
-- =============================================

-- 1. Tabel About (profil info)
CREATE TABLE IF NOT EXISTS about (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL DEFAULT 'Nico',
  headline text DEFAULT '',
  introduction text DEFAULT '',
  about_headline text DEFAULT '',
  about_paragraphs text[] DEFAULT '{}',
  email text DEFAULT '',
  github_username text DEFAULT '',
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default about row
INSERT INTO about (name, headline, introduction, about_headline, about_paragraphs, email, github_username)
VALUES (
  'Nico',
  'Informatics Engineering Student, Universitas Muhammadiyah Malang.',
  'I''m Nico, a student from Universitas Muhammadiyah Malang, passionate about technology and software development.',
  'I''m Nico Fantri M, an Informatics Engineering student at Universitas Muhammadiyah Malang.',
  ARRAY[
    'I am passionate about programming and technology. I started learning programming when I joined the Informatics Engineering department.',
    'Besides studying, I also have many hobbies such as traveling, photography, watching movies, listening to music, and more.',
    'Currently, I am focusing on improving my skills in software development and frequently working on side projects to gain experience.'
  ],
  'nicofantrimayharis@gmail.com',
  'nicofantri'
);

-- 2. Tabel Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text DEFAULT '',
  link_href text DEFAULT '#',
  link_label text DEFAULT '',
  logo text DEFAULT '',
  category text[] DEFAULT '{}',
  tags text[] DEFAULT '{}',
  is_github boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Tabel Education (riwayat studi)
CREATE TABLE IF NOT EXISTS education (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  school text NOT NULL,
  major text DEFAULT '',
  logo text DEFAULT '',
  start_year text NOT NULL,
  end_year text DEFAULT 'present',
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default education
INSERT INTO education (school, major, logo, start_year, end_year, sort_order)
VALUES ('Universitas Muhammadiyah Malang', 'teknik informatika', 'informatic', '2022', 'present', 1);

-- 4. Tabel Certificates (sertifikat)
CREATE TABLE IF NOT EXISTS certificates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  issuer text DEFAULT '',
  date text DEFAULT '',
  description text DEFAULT '',
  image_url text DEFAULT '',
  credential_url text DEFAULT '',
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Tabel Chat Messages (sudah dibuat sebelumnya, skip jika sudah ada)
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- About: read publik, update hanya authenticated
ALTER TABLE about ENABLE ROW LEVEL SECURITY;
CREATE POLICY "about_read" ON about FOR SELECT USING (true);
CREATE POLICY "about_update" ON about FOR UPDATE USING (auth.role() = 'authenticated');

-- Projects: read publik, CUD hanya authenticated
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "projects_read" ON projects FOR SELECT USING (true);
CREATE POLICY "projects_insert" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "projects_update" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "projects_delete" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Education: read publik, CUD hanya authenticated
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "education_read" ON education FOR SELECT USING (true);
CREATE POLICY "education_insert" ON education FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "education_update" ON education FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "education_delete" ON education FOR DELETE USING (auth.role() = 'authenticated');

-- Certificates: read publik, CUD hanya authenticated
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "certificates_read" ON certificates FOR SELECT USING (true);
CREATE POLICY "certificates_insert" ON certificates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "certificates_update" ON certificates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "certificates_delete" ON certificates FOR DELETE USING (auth.role() = 'authenticated');

-- Chat: read & insert publik
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
-- Cek apakah policy sudah ada sebelum buat (skip jika error)
DO $$ BEGIN
  CREATE POLICY "chat_read" ON chat_messages FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
  CREATE POLICY "chat_insert" ON chat_messages FOR INSERT WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Realtime (skip jika sudah ada)
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Storage bucket for project images & certificates
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: anyone can read, authenticated can upload
CREATE POLICY "portfolio_public_read" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');
CREATE POLICY "portfolio_auth_upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "portfolio_auth_update" ON storage.objects FOR UPDATE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
CREATE POLICY "portfolio_auth_delete" ON storage.objects FOR DELETE USING (bucket_id = 'portfolio' AND auth.role() = 'authenticated');
