-- ====================================================================
-- Flyway Migration: V200__init_vehicle_tracking_pickup_schema.sql
-- Module: Member 2 (Vehicles, Collection Trips, Vehicle Tracking,
--         Pickup Requests & Pickup History)
-- ====================================================================

-- 1. Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
    id BIGSERIAL PRIMARY KEY,
    vehicle_number VARCHAR(50) NOT NULL UNIQUE,
    vehicle_type VARCHAR(50) NOT NULL,
    capacity_kg DOUBLE PRECISION NOT NULL,
    current_status VARCHAR(30) NOT NULL DEFAULT 'AVAILABLE',
    assigned_collector_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    municipality_id BIGINT REFERENCES municipalities(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Collection Trips
CREATE TABLE IF NOT EXISTS collection_trips (
    id BIGSERIAL PRIMARY KEY,
    schedule_id BIGINT REFERENCES collection_schedules(id) ON DELETE SET NULL,
    vehicle_id BIGINT NOT NULL REFERENCES vehicles(id) ON DELETE RESTRICT,
    collector_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    trip_date DATE NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PLANNED',
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    collected_waste_kg DOUBLE PRECISION,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Vehicle Locations (GPS Breadcrumbs)
CREATE TABLE IF NOT EXISTS vehicle_locations (
    id BIGSERIAL PRIMARY KEY,
    trip_id BIGINT NOT NULL REFERENCES collection_trips(id) ON DELETE CASCADE,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    speed DOUBLE PRECISION,
    heading DOUBLE PRECISION,
    recorded_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Pickup Requests (Bulky / On-demand waste pickup)
CREATE TABLE IF NOT EXISTS pickup_requests (
    id BIGSERIAL PRIMARY KEY,
    resident_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    waste_category_id BIGINT REFERENCES waste_categories(id) ON DELETE SET NULL,
    waste_type VARCHAR(100) NOT NULL,
    quantity VARCHAR(100) NOT NULL,
    estimated_weight_kg DOUBLE PRECISION,
    location VARCHAR(255) NOT NULL,
    area VARCHAR(100),
    city VARCHAR(100),
    municipality_id BIGINT REFERENCES municipalities(id) ON DELETE SET NULL,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
    requested_date DATE NOT NULL,
    preferred_time_slot VARCHAR(50),
    notes TEXT,
    assigned_collector_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    contact_phone VARCHAR(30),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Pickup Status History (Audit trail)
CREATE TABLE IF NOT EXISTS pickup_status_history (
    id BIGSERIAL PRIMARY KEY,
    pickup_request_id BIGINT NOT NULL REFERENCES pickup_requests(id) ON DELETE CASCADE,
    status VARCHAR(30) NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    changed_by_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Performance Indices
CREATE INDEX IF NOT EXISTS idx_vehicles_collector ON vehicles(assigned_collector_id);
CREATE INDEX IF NOT EXISTS idx_collection_trips_schedule ON collection_trips(schedule_id);
CREATE INDEX IF NOT EXISTS idx_collection_trips_vehicle ON collection_trips(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_collection_trips_collector ON collection_trips(collector_id);
CREATE INDEX IF NOT EXISTS idx_collection_trips_date ON collection_trips(trip_date);
-- Critical fast-growing table compound index
CREATE INDEX IF NOT EXISTS idx_vehicle_locations_trip_time ON vehicle_locations(trip_id, recorded_at);
CREATE INDEX IF NOT EXISTS idx_pickup_requests_resident ON pickup_requests(resident_id);
CREATE INDEX IF NOT EXISTS idx_pickup_requests_status ON pickup_requests(status);
CREATE INDEX IF NOT EXISTS idx_pickup_requests_date ON pickup_requests(requested_date);
CREATE INDEX IF NOT EXISTS idx_pickup_status_history_request ON pickup_status_history(pickup_request_id);
