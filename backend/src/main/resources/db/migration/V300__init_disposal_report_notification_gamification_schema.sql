-- ====================================================================
-- Flyway Migration: V300__init_disposal_report_notification_gamification_schema.sql
-- Module: Member 3 (Disposal Centers, Center Opening Hours,
--         Center Accepted Wastes, Issue Reports & Status History,
--         Notifications, Gamification Profiles, Point Ledger, Badges,
--         Levels, Challenges, Rewards, Resident Logs & Activity Logs)
-- ====================================================================

-- 1. Disposal Centers
CREATE TABLE IF NOT EXISTS disposal_centers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    area VARCHAR(100),
    ward_zone VARCHAR(100),
    corridor VARCHAR(100),
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(150),
    capacity_status VARCHAR(30) NOT NULL DEFAULT 'NORMAL',
    collection_available BOOLEAN NOT NULL DEFAULT FALSE,
    drop_off_available BOOLEAN NOT NULL DEFAULT TRUE,
    stream_group VARCHAR(30) NOT NULL DEFAULT 'ALL',
    rating DOUBLE PRECISION DEFAULT 0.0,
    solar_powered BOOLEAN NOT NULL DEFAULT FALSE,
    hero_image_url VARCHAR(500),
    status VARCHAR(30) NOT NULL DEFAULT 'OPERATIONAL',
    municipality_id BIGINT REFERENCES municipalities(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Center Opening Hours
CREATE TABLE IF NOT EXISTS center_opening_hours (
    id BIGSERIAL PRIMARY KEY,
    center_id BIGINT NOT NULL REFERENCES disposal_centers(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL,
    open_time TIME,
    close_time TIME,
    is_closed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Center Accepted Wastes (Many-to-Many Join Table)
CREATE TABLE IF NOT EXISTS center_accepted_wastes (
    center_id BIGINT NOT NULL REFERENCES disposal_centers(id) ON DELETE CASCADE,
    waste_category_id BIGINT NOT NULL REFERENCES waste_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (center_id, waste_category_id)
);

-- 4. Issue Reports (Resident Complaints & Illegal Dumping)
CREATE TABLE IF NOT EXISTS issue_reports (
    id BIGSERIAL PRIMARY KEY,
    ticket_number VARCHAR(50) NOT NULL UNIQUE,
    reporter_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    status VARCHAR(30) NOT NULL DEFAULT 'SUBMITTED',
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    municipality_id BIGINT REFERENCES municipalities(id) ON DELETE SET NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    assigned_officer_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    resolved_date TIMESTAMPTZ,
    resolution_notes TEXT,
    evidence_urls TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Issue Status History (Audit trail)
CREATE TABLE IF NOT EXISTS issue_status_history (
    id BIGSERIAL PRIMARY KEY,
    issue_report_id BIGINT NOT NULL REFERENCES issue_reports(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    changed_by_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Notifications (In-app Notification Feed)
CREATE TABLE IF NOT EXISTS notifications (
    id BIGSERIAL PRIMARY KEY,
    recipient_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_role VARCHAR(30),
    type VARCHAR(30) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50),
    related_entity_id BIGINT,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    link VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. User Green Profiles (Gamification & Eco Metrics)
CREATE TABLE IF NOT EXISTS user_green_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    eco_level INTEGER NOT NULL DEFAULT 1,
    rank_title VARCHAR(100) DEFAULT 'Eco Novice',
    monthly_recycled_kg DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    total_recycled_kg DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    streak_days INTEGER NOT NULL DEFAULT 0,
    co2_saved_kg DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    trees_equivalent INTEGER NOT NULL DEFAULT 0,
    water_saved_liters DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Point Transactions (Ledger for all points earned / redeemed)
CREATE TABLE IF NOT EXISTS point_transactions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    reason VARCHAR(255) NOT NULL,
    source_type VARCHAR(50) NOT NULL,
    source_id BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Badges
CREATE TABLE IF NOT EXISTS badges (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL,
    icon_url VARCHAR(500),
    points_threshold INTEGER,
    category VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. User Badges (Earned Badges)
CREATE TABLE IF NOT EXISTS user_badges (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id BIGINT NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_badge UNIQUE (user_id, badge_id)
);

-- 11. Levels
CREATE TABLE IF NOT EXISTS levels (
    id BIGSERIAL PRIMARY KEY,
    level_number INTEGER NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    min_points INTEGER NOT NULL,
    max_points INTEGER,
    badge_icon VARCHAR(255),
    perks TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Challenges
CREATE TABLE IF NOT EXISTS challenges (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    target_count INTEGER NOT NULL,
    target_type VARCHAR(50) NOT NULL,
    points_reward INTEGER NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reward_badge_id BIGINT REFERENCES badges(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Challenge Participants
CREATE TABLE IF NOT EXISTS challenge_participants (
    id BIGSERIAL PRIMARY KEY,
    challenge_id BIGINT NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_progress INTEGER NOT NULL DEFAULT 0,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_challenge_user UNIQUE (challenge_id, user_id)
);

-- 14. Rewards Catalog
CREATE TABLE IF NOT EXISTS rewards (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    points_cost INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    partner_name VARCHAR(150),
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    image_url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    expiry_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Reward Redemptions
CREATE TABLE IF NOT EXISTS reward_redemptions (
    id BIGSERIAL PRIMARY KEY,
    reward_id BIGINT NOT NULL REFERENCES rewards(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    points_spent INTEGER NOT NULL,
    redemption_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. Resident Waste Logs
CREATE TABLE IF NOT EXISTS resident_waste_logs (
    id BIGSERIAL PRIMARY KEY,
    resident_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    waste_category_id BIGINT NOT NULL REFERENCES waste_categories(id) ON DELETE RESTRICT,
    weight_kg DOUBLE PRECISION NOT NULL,
    log_date DATE NOT NULL,
    disposal_method VARCHAR(50),
    points_earned INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. Activity Logs (Audit / Platform Operations)
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    module VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL DEFAULT 'INFO',
    performed_by_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    performed_by_role VARCHAR(50),
    ip_address VARCHAR(50),
    entity_type VARCHAR(50),
    entity_id BIGINT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indices
CREATE INDEX IF NOT EXISTS idx_disposal_centers_city ON disposal_centers(city);
CREATE INDEX IF NOT EXISTS idx_disposal_centers_status ON disposal_centers(status);
CREATE INDEX IF NOT EXISTS idx_disposal_centers_capacity ON disposal_centers(capacity_status);
CREATE INDEX IF NOT EXISTS idx_center_opening_hours_center ON center_opening_hours(center_id);
CREATE INDEX IF NOT EXISTS idx_issue_reports_reporter ON issue_reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_issue_reports_status ON issue_reports(status);
CREATE INDEX IF NOT EXISTS idx_issue_reports_municipality ON issue_reports(municipality_id);
CREATE INDEX IF NOT EXISTS idx_issue_status_history_report ON issue_status_history(issue_report_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_point_transactions_user ON point_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_participants_user ON challenge_participants(user_id);
CREATE INDEX IF NOT EXISTS idx_reward_redemptions_user ON reward_redemptions(user_id);
CREATE INDEX IF NOT EXISTS idx_resident_waste_logs_resident ON resident_waste_logs(resident_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_module ON activity_logs(module);
