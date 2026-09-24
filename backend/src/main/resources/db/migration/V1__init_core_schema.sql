-- ====================================================================
-- Flyway Migration: V1__init_core_schema.sql
-- Module: Shared / Core (Roles, Municipalities, Waste Categories,
--         Collection Zones, Users, Staff Profiles)
-- ====================================================================

-- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Municipalities
CREATE TABLE IF NOT EXISTS municipalities (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    province VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    contact_officer VARCHAR(150),
    phone VARCHAR(30),
    email VARCHAR(150),
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Waste Categories
CREATE TABLE IF NOT EXISTS waste_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    color VARCHAR(20),
    icon VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Collection Zones
CREATE TABLE IF NOT EXISTS collection_zones (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    municipality_id BIGINT NOT NULL REFERENCES municipalities(id) ON DELETE CASCADE,
    description TEXT,
    ward_number VARCHAR(50),
    coverage_area VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Users
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    address VARCHAR(255),
    city VARCHAR(100),
    district VARCHAR(100),
    province VARCHAR(100),
    nic VARCHAR(30) UNIQUE,
    avatar_url VARCHAR(500),
    role_id BIGINT NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Staff Profiles
CREATE TABLE IF NOT EXISTS staff_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    municipality_id BIGINT REFERENCES municipalities(id) ON DELETE SET NULL,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    designation VARCHAR(100),
    employment_type VARCHAR(50),
    assigned_zone VARCHAR(100),
    licence_number VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);
CREATE INDEX IF NOT EXISTS idx_collection_zones_municipality ON collection_zones(municipality_id);
CREATE INDEX IF NOT EXISTS idx_staff_profiles_user ON staff_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_staff_profiles_municipality ON staff_profiles(municipality_id);
