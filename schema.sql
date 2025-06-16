-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create categories table (for projects)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name JSONB NOT NULL DEFAULT '{}'::jsonb, -- Store localized names as JSON
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  image VARCHAR(512) NOT NULL,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title JSONB NOT NULL DEFAULT '{}'::jsonb, -- Localized titles
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description JSONB NOT NULL DEFAULT '{}'::jsonb, -- Localized short descriptions
  description JSONB NOT NULL DEFAULT '{}'::jsonb, -- Localized descriptions
  icon VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(512),
  author_id UUID REFERENCES users(id),
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title JSONB NOT NULL DEFAULT '{}'::jsonb, -- Localized titles
  slug VARCHAR(255) UNIQUE NOT NULL,
  description JSONB NOT NULL DEFAULT '{}'::jsonb, -- Localized descriptions
  content JSONB NOT NULL DEFAULT '{}'::jsonb, -- Localized content
  featured_image VARCHAR(512),
  client VARCHAR(255),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category_id ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Add a trigger function to update the updated_at column
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for each table using IF NOT EXISTS
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_modtime') THEN
        CREATE TRIGGER update_users_modtime
        BEFORE UPDATE ON users
        FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_categories_modtime') THEN
        CREATE TRIGGER update_categories_modtime
        BEFORE UPDATE ON categories
        FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_team_members_modtime') THEN
        CREATE TRIGGER update_team_members_modtime
        BEFORE UPDATE ON team_members
        FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_posts_modtime') THEN
        CREATE TRIGGER update_blog_posts_modtime
        BEFORE UPDATE ON blog_posts
        FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_projects_modtime') THEN
        CREATE TRIGGER update_projects_modtime
        BEFORE UPDATE ON projects
        FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_modtime') THEN
        CREATE TRIGGER update_services_modtime
        BEFORE UPDATE ON services
        FOR EACH ROW EXECUTE FUNCTION update_modified_column();
    END IF;
END
$$;