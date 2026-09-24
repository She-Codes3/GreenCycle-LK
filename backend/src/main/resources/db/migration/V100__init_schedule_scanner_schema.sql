-- ====================================================================
-- Flyway Migration: V100__init_schedule_scanner_schema.sql
-- Module: Member 1 (Collection Schedules & AI Scans)
-- ====================================================================

-- 1. Collection Schedules
CREATE TABLE IF NOT EXISTS collection_schedules (
    id BIGSERIAL PRIMARY KEY,
    zone_id BIGINT NOT NULL REFERENCES collection_zones(id) ON DELETE CASCADE,
    waste_category_id BIGINT NOT NULL REFERENCES waste_categories(id) ON DELETE RESTRICT,
    day_of_week VARCHAR(20) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'SCHEDULED',
    description VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. AI Scans
CREATE TABLE IF NOT EXISTS ai_scans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    predicted_category VARCHAR(100) NOT NULL,
    confidence DOUBLE PRECISION NOT NULL,
    matched_item VARCHAR(150),
    user_confirmed BOOLEAN,
    feedback VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_collection_schedules_zone ON collection_schedules(zone_id);
CREATE INDEX IF NOT EXISTS idx_collection_schedules_waste ON collection_schedules(waste_category_id);
CREATE INDEX IF NOT EXISTS idx_collection_schedules_day ON collection_schedules(day_of_week);
CREATE INDEX IF NOT EXISTS idx_ai_scans_user ON ai_scans(user_id);
